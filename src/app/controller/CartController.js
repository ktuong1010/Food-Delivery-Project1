// Importing the CartModel to interact with the cart data in the database
const CartModel = require('../models/orderModel');

class CartController {

    // [GET] /item/create - Display the user's cart
    async showcart(req, res, next) {
        try {
            // Extract the user ID from the session
            const userId = req.session.user.id;

            // Instantiate the CartModel to interact with the cart data
            const cartModel = new CartModel();

            // Fetch the cart data for the logged-in user
            const cart = await cartModel.showCartbyID(userId);

            // Render the cart view with the fetched cart data
            res.render('order/cart', { 
                layout: 'user', // Use the user layout
                cart: cart // Pass the cart data to the view
            });
        } catch (err) {
            // Log any errors that occur
            console.log(err);
        }
    }
}

// Exporting an instance of the CartController class
module.exports = new CartController();