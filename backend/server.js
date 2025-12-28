
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import "dotenv/config";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// // app config
// // require("dotenv").config();

// const app = express();
// const port =process.env.PORT || 4000;

// //middlewares
// app.use(express.json());
// app.use(cors());

// // DB connection
// connectDB();

// // api endpoints
// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// app.listen(port, () => {
//   console.log(`Server Started on port: ${port}`);
// });



import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";
import path from "path";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());

// ✅ CORS configuration (IMPORTANT for Render)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://shivam-fastfood-frontend.onrender.com",
      "https://shivam-fastfood-admin.onrender.com"
    ],
    credentials: true
  })
);

// DB connection
connectDB();

// static files (images)
app.use("/images", express.static("uploads"));

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// server listen
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
