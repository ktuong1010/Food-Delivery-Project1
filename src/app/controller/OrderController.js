const orderModel = require('../models/orderModel');

class OrderController  {
    
    async placeOrder(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }
            const { itemId, quantity } = req.body;
            if (!itemId || !quantity || quantity <= 0) {
                return res.status(400).send('Item ID and valid quantity are required');
            }
            const items = [{ itemId: parseInt(itemId), quantity: parseInt(quantity) }];
            const OrderModel = new orderModel();
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items);
            res.render('order/order-confirmation', {
                layout: 'public',
                orderId,
                total
            });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new OrderController();