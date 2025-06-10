// Importing the orderModel to interact with the order data in the database
const orderModel = require('../models/orderModel');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

class OrderController {

    // [POST] /order - Handle placing an order
    async placeOrder(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if the user is not logged in
            }

            // Extract item ID and quantity from the request body
            const { itemId, quantity } = req.body;

            // Validate the input fields
            if (!itemId || !quantity || quantity <= 0) {
                return res.status(400).send('Item ID and valid quantity are required'); // Return 400 if validation fails
            }

            // Create an array of items to be ordered
            const items = [{ itemId: parseInt(itemId), quantity: parseInt(quantity) }];

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Create the order and retrieve the order ID and total cost
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items);

            // Render the order confirmation page with the order details
            res.render('order/order-confirmation', {
                layout: 'public', // Use the public layout
                orderId, // Pass the order ID
                total // Pass the total cost of the order
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error placing order:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }

    async updateOrderStatus(req, res) {
        try {
            // Check if the user is logged in and is an admin
            if (!req.session.user || !req.session.user.isAdmin) {
                return res.status(403).send('Access denied: Admins only'); // Return 403 if the user is not an admin
            }

            // Extract the order ID from the request parameters
            const orderId = req.params.id;

            // Extract the new status from the request body
            const { status } = req.body;

            // Validate the status to ensure it is one of the allowed values
            if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
                return res.status(400).send('Invalid status'); // Return 400 if the status is invalid
            }

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Update the order status in the database
            await OrderModel.updateOrderStatus(orderId, status);

            // Redirect to the admin dashboard with a success message
            res.redirect('/me?success=Order+status+updated');
        } catch (error) {
            // Log and handle any errors
            console.error('Error updating order status:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }
}

// Exporting an instance of the OrderController class
module.exports = new OrderController();

// Register the helper
const hbs = exphbs.create({
  helpers: {
    multiply: (a, b) => a * b
  }
});

Handlebars.registerHelper('multiply', function(a, b) {
  return a * b;
});