import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
  try {
    const itemsByRestaurant = {};
    req.body.items.forEach(item => {
      const rId = item.restaurantId || "unknown";
      if (!itemsByRestaurant[rId]) {
         itemsByRestaurant[rId] = { items: [], amount: 0 };
      }
      itemsByRestaurant[rId].items.push(item);
      itemsByRestaurant[rId].amount += item.price * item.quantity;
    });

    const orderIds = [];
    for (const rId in itemsByRestaurant) {
      const group = itemsByRestaurant[rId];
      const newOrder = new orderModel({
        userId: req.body.userId,
        restaurantId: rId,
        items: group.items,
        amount: group.amount + 2, // adding 2 for delivery per restaurant
        address: req.body.address,
      });
      await newOrder.save();
      orderIds.push(newOrder._id.toString());
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * Object.keys(itemsByRestaurant).length,
      },
      quantity: 1,
    });

    const joinedOrderIds = orderIds.join(",");

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${joinedOrderIds}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${joinedOrderIds}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const orderIds = orderId.split(",");
    if (success == "true") {
      await orderModel.updateMany({ _id: { $in: orderIds } }, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.deleteMany({ _id: { $in: orderIds } });
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const orders = await orderModel.find({ restaurantId: req.body.userId });
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await orderModel.findOneAndUpdate(
        { _id: req.body.orderId, restaurantId: req.body.userId },
        { status: req.body.status }
      );
      res.json({ success: true, message: "Status Updated Successfully" });
    } else {
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
