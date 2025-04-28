const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');

class MeController {
    // Admin homepage (/admin)
    async adminHome(req, res) {
        if (!req.session.user) {
            return res.redirect('/login'); // Not logged in
        }
        if (!req.session.user.isAdmin) {
            return res.status(403).send('Access denied: Admins only');
        }

        const ItemModel = new itemModel();
        const item = await ItemModel.showitem();
       

        res.render('admin/home-admin', { layout:'admin', username: req.session.user.username, item: item });
    }

    // [GET] /item/create
    async storeditem(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login'); // Not logged in
        }
        if (!req.session.user.isAdmin) {
            return res.status(403).send('Access denied: Admins only');
        }

        const ItemModel = new itemModel();
        const item = await ItemModel.showitem();
        console.log(item) 
        res.render('me/stored-item',{layout:'admin', item: item });

    }

    async OrderList(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login'); // Not logged in
        }
        if (!req.session.user.isAdmin) {
            return res.status(403).send('Access denied: Admins only');
        }

        const OrderModel = new orderModel();
        const order = await OrderModel.showAllOrders();
        console.log(order) 
        res.render('me/order-list',{layout:'admin', order: order });

    }
}

module.exports = new MeController();

