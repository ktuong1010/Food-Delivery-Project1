const CartModel = require('../models/orderModel');

class CartController {

    // [GET] /item/create
    async showcart(req, res, next) {
        try{
            const userId = req.session.user.id;
            // Send the userId as JSON response
            const cartModel = new CartModel();
            const cart = await cartModel.showCartbyID(userId);  
            res.render('order/cart', { layout: 'user', cart: cart }); // Render the cart view with the cart data
            // Send the cart data as JSON response

        }catch(err){
            console.log(err)
        }

    }
}

module.exports = new CartController();