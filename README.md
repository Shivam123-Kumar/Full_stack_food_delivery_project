# shivam fast food wallah - Multi-Restaurant Food Ordering Platform

This repository hosts the source code for the "shivam fast food wallah" platform, a dynamic, multi-tenant food delivery application built with the MERN Stack. It provides a robust ecosystem for multiple distinct restaurants to independently manage their menus and orders, while offering a unified platform for end-users to seamlessly discover food and place orders.

Vercel link: https://full-stack-food-delivery-project.vercel.app/

## Features

- **Multi-Restaurant Architecture**: Database-level isolation allowing multiple independent restaurants to operate securely on a single platform.
- **Isolated Admin Panel**: Restaurant administrators can log in to manage their own products and orders without overlapping with other vendors.
- **Unified User Panel**: Customers can seamlessly browse menus, apply filters, and order foods from various restaurants.
- **Secure Authentication**: JWT-based login/signup, Role-Based Access Control (RBAC), and Bcrypt password hashing.
- **Payment Processing**: Full Stripe integration for secure and reliable checkouts.
- **Products & Order Management**: Comprehensive RESTful APIs for managing food inventory (with Multer for image uploads) and tracking real-time order delivery statuses.
- **Modern & Responsive UI**: Clean interface, dynamic cart management, and beautiful alerts.

## Run Locally

Clone the project

```bash
    git clone https://github.com/Shivam123-Kumar/Full_stack_food_delivery_project
```
Go to the project directory

```bash
    cd Food-Delivery
```
Install dependencies (frontend)

```bash
    cd frontend
    npm install
```
Install dependencies (admin)

```bash
    cd admin
    npm install
```
Install dependencies (backend)

```bash
    cd backend
    npm install
```
Setup Environment Variables

```text
Make .env file in "backend" folder and store environment Variables
  JWT_SECRET=YOUR_SECRET_TEXT
  SALT=YOUR_SALT_VALUE
  MONGO_URL=YOUR_DATABASE_URL
  STRIPE_SECRET_KEY=YOUR_KEY
```

Setup the Frontend and Backend URL
   - App.jsx in Admin folder:
      `const url = YOUR_BACKEND_URL`
     
   - StoreContext.js in Frontend folder:
      `const url = YOUR_BACKEND_URL`

   - orderController in Backend folder:
      `const frontend_url = YOUR_FRONTEND_URL`

Start the Backend server

```bash
    cd backend
    nodemon server.js
```

Start the Frontend React app

```bash
    cd frontend
    npm run dev
```

Start the Admin Dashboard app

```bash
    cd admin
    npm run dev
```

## Tech Stack
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Stripe](https://stripe.com/)
* [JWT-Authentication](https://jwt.io/introduction)
* [Multer](https://www.npmjs.com/package/multer)

## Contributing

Contributions are always welcome!
Just raise an issue, and we will discuss it.
