const itemModel = require('../models/itemModel');

class ItemController {

    // [GET] /item/create
    create(req, res, next) {
        res.render('item/create',{layout:'admin'});

    }
    // [POST] /item/store
    async store(req, res) {
        try {
            // Check if user is logged in and an admin
            if (!req.session.user || !req.session.user.isAdmin) {
                return res.status(403).json({ message: 'Access denied: Admins only' });
            }

            // Extract data from req.body
            const { name, description, image, price } = req.body;

            // Validate input
            if (!name || !description || !image) {
                return res.status(400).json({ message: 'Name, description, and image are required' });
            }

            // Create itemData object
            const itemData = { name, description, image, price };

            // Instantiate itemModel and call additem
            const ItemModel = new itemModel();
            const result = await ItemModel.additem(itemData);

            // Respond with success
            return res.status(201).json({
                message: 'Item added successfully',
                itemId: result.insertId
            });
        } catch (error) {
            console.error('Error in addItem controller:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async show(req, res){
        try {
            const slug = req.params.slug;
            
            const ItemModel = new itemModel();
            const item = await ItemModel.getItemBySlug(slug);
            if (!item) {
                return res.status(404).send('Item not found');
            }
            res.render('item/item-details', {
                layout: 'admin',
                item
            });
        } catch (error) {
            console.error('Error fetching item:', error);
            res.status(500).send('Internal server error');
        }
    }
    edit(req, res) {
        const slug = req.params.slug;
        console.log("Slug:",slug)
        const ItemModel = new itemModel();
        ItemModel.getItemBySlug(slug)
            .then(item => {
                if (!item) {
                    return res.status(404).send('Item not found');
                }
                res.render('item/edit-item', {
                    layout: 'admin',
                    item
                });
            })
            .catch(error => {
                console.error('Error fetching item for edit:', error);
                res.status(500).send('Internal server error');
            });
    }
   
    async update(req, res) {
        try {
            if (!req.session.user || !req.session.user.isAdmin) {
                return res.status(403).send('Access denied: Admins only');
            }
            const id = req.params.id;
            const { name, description, image, price } = req.body;

            // Validate input, treat empty strings as null
             if (!name || price == null)
                {
                return res.status(400).send('Name and price are required');
            }
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return res.status(400).send('Price must be a positive number');
            }

            //Create itemData with defaults for optional fields
            const itemData = {
                name,
                description: description || null,
                image: image || null,
                price: parsedPrice
            };
              const ItemModel = new itemModel();
            const result = await ItemModel.editItem(id, itemData);
            if (result.affectedRows === 0) {
                return res.status(404).send('Item not found');
            }
            res.redirect('/admin?success=Item+updated');
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).send('Internal server error');
        }
    }

    async showOrderForm(req, res) {
        try {
            const slug = req.params.slug;
            const ItemModel = new itemModel();
            const item = await ItemModel.getItemBySlug(slug);
            if (!item) {
                return res.status(404).send('Item not found');
            }
            res.render('order/place-order', {
                layout: 'public',
                item
            });
        } catch (error) {
            console.error('Error showing order form:', error);
            res.status(500).send('Internal server error');
        }
    }

}

module.exports = new ItemController();

