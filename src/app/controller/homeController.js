// Importing the required models
const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');

class homeController {

    // Public homepage (/public-home)
    async publicHome(req, res) {
        const ItemModel = new itemModel(); // Instantiate the item model
        const item = await ItemModel.showitem(); // Fetch all items from the database
        res.render('public-home', {
            layout: 'public', // Use the public layout
            item: item // Pass the fetched items to the view
        });
    }

    // User homepage (/user)
    async userHome(req, res) {
        // Check if the user is logged in
        if (!req.session.user) {
            return res.redirect('/login'); // Redirect to login if not logged in
        }

        // Prevent admins from accessing the user homepage
        if (req.session.user.isAdmin) {
            return res.redirect('/admin'); // Redirect admins to the admin dashboard
        }

        const ItemModel = new itemModel(); // Instantiate the item model
        const item = await ItemModel.showitem(); // Fetch all items from the database
        res.render('user/home-user', {
            layout: 'user', // Use the user layout
            username: req.session.user.username, // Pass the logged-in user's username
            item: item // Pass the fetched items to the view
        });
    }

    // Place an order
    async placeOrder(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if not logged in
            }

            // Extract item ID and quantity from the request body
            const { itemId, quantity } = req.body;

            // Validate the input fields
            if (!itemId || !quantity || quantity <= 0) {
                return res.status(400).send('Item ID and valid quantity are required'); // Return 400 if validation fails
            }

            // Create an array of items to be ordered
            const items = [{ itemId: parseInt(itemId), quantity: parseInt(quantity) }];

            const OrderModel = new orderModel(); // Instantiate the order model
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items); // Create the order

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

    // Search for items
    async search(req, res) {
        try {
            const query = req.query.query; // Extract the search query from the request parameters
            const ItemModel = new itemModel(); // Instantiate the item model
            const items = await ItemModel.searchItems(query); // Search for items matching the query

            // Return the search results as JSON
            res.json({ query, items });
        } catch (error) {
            // Log and handle any errors
            console.error('Error in search:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }
}

// Exporting an instance of the homeController class
module.exports = new homeController();