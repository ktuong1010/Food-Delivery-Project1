const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');

class homeController  {
    
    // Public homepage (/public-home)
    async publicHome(req, res) {
        const ItemModel = new itemModel();
        const item = await ItemModel.showitem();
        res.render('public-home', {
            layout: 'public',
            item: item 
           
        });
    }
    // User homepage (/user)
    async userHome(req, res) {
        if (!req.session.user) {
            return res.redirect('/login'); // Not logged in
        }
        if (req.session.user.isAdmin) {
            return res.redirect('/admin'); // Admins can't access /user
        }
        const ItemModel = new itemModel();
        const item = await ItemModel.showitem();
        res.render('user/home-user', {layout:'user', username: req.session.user.username, item: item });
    }
 
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

    async search(req, res) {
        try {
            const query = req.query.query;
            const ItemModel = new itemModel();
            const items = await ItemModel.searchItems(query); // Add to itemModel
            // res.render('search-results', { layout: 'public', items, query });
            res.json({ query, items });
        } catch (error) {
            console.error('Error in search:', error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new homeController();