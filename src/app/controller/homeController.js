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
            item: item, // Pass the fetched items to the view
            user: {
            location: 'Regent Street, A4, A4201, London'
            },
            cart: {
            items: 23,
            total: '79.89'
            },
            exclusiveDeals: [
            {
                image: '/img/Exclusive deals for burgers.svg',
                alt: 'For Burgers',
                discount: '-40%',
                type: 'Restaurant',
                name: 'For Burgers'
            },
            {
                image: '/img/exclusive deal for First order.svg',
                alt: 'First Order',
                discount: '-20%',
                type: 'Restaurant',
                name: 'First Order'
            }
            ],
            categories: [
            { image: '/img/categories/burger-and-fastfood.svg', name: 'Burgers & Fast food', count: 21 },
            { image: '/img/categories/salads.svg', name: 'Salads', count: 32 },
            { image: '/img/categories/pasta.svg', name: 'Pasta & Casuals', count: 4 },
            { image: '/img/categories/pizza.svg', name: 'Pizza', count: 32 },
            { image: '/img/categories/breakfast.svg', name: 'Breakfast', count: 4 },
            { image: '/img/categories/soups.svg', name: 'Soups', count: 32 }
            ],
            restaurants: [
            { 
                image: '/img/restaurants/huongquequan.png', 
                name: "Hương Quê Quán",
                link: '/restaurant' // Add link to navigate to restaurant page
            },
            { image: '/img/restaurants/kfc-binh-duong.png', name: "KFC Bình Dương" },
            { image: '/img/restaurants/life-coffee.jpg', name: "Life Coffee" },
            { image: '/img/restaurants/pho-viet-huong.jpg', name: "Phở Việt Hương" },
            { image: '/img/burger king.svg', name: "Burger King Bình Dương" }
            ]
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
            currentPath: req.path,
            layout: 'user', // Use the user layout
            username: req.session.user.username, // Pass the logged-in user's username
            item: item, // Pass the fetched items to the view
            user: {
            location: 'Regent Street, A4, A4201, London'
            },
            cart: {
            items: 23,
            total: '79.89'
            },
            exclusiveDeals: [
            {
                image: '/img/Exclusive deals for burgers.svg',
                alt: 'For Burgers',
                discount: '-40%',
                type: 'Restaurant',
                name: 'For Burgers'
            },
            {
                image: '/img/exclusive deal for First order.svg',
                alt: 'First Order',
                discount: '-20%',
                type: 'Restaurant',
                name: 'First Order'
            }
            ],
            categories: [
            { image: '/img/categories/burger-and-fastfood.svg', name: 'Burgers & Fast food', count: 21 },
            { image: '/img/categories/salads.svg', name: 'Salads', count: 32 },
            { image: '/img/categories/pasta.svg', name: 'Pasta & Casuals', count: 4 },
            { image: '/img/categories/pizza.svg', name: 'Pizza', count: 32 },
            { image: '/img/categories/breakfast.svg', name: 'Breakfast', count: 4 },
            { image: '/img/categories/soups.svg', name: 'Soups', count: 32 }
            ],
            restaurants: [
            { 
                image: '/img/restaurants/huongquequan.png', 
                name: "Hương Quê Quán",
                link: '/restaurant' // Add link to navigate to restaurant page
            },
            { image: '/img/restaurants/kfc-binh-duong.png', name: "KFC Bình Dương" },
            { image: '/img/restaurants/life-coffee.jpg', name: "Life Coffee" },
            { image: '/img/restaurants/pho-viet-huong.jpg', name: "Phở Việt Hương" },
            { image: '/img/burger king.svg', name: "Burger King Bình Dương" }
            ]
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

    async menu(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if not logged in
            }

            // Prevent admins from accessing the user homepage
            if (req.session.user.isAdmin) {
                return res.redirect('/admin'); // Redirect admins to the admin dashboard
            }

            // Fetch all items from the database
            const ItemModel = new itemModel();
            const items = await ItemModel.showitem();

            // Render the menu view with the fetched data
            res.render('item/menu', {
                layout: 'user', // Use the user layout
                items, // Pass the fetched items to the view
                currentPath: req.path, // Pass the current path for active link highlighting
                
            });
        } catch (error) {
            // Log the error for debugging
            console.error('Error in menu:', error);

            // Render an error page or send a user-friendly error message
            res.status(500).render('error', {
                layout: 'public', // Use a public layout for error pages
                message: 'An error occurred while loading the menu. Please try again later.',
            });
        }
    }

    async restaurantMenu(req, res) {
        try {
            // Check if the user is logged in
            // if (!req.session.user) {
            //     return res.redirect('/login'); // Redirect to login if not logged in
            // }

            // Render the restaurant menu view
            res.render('restaurant-menu', {
                layout: 'user',
                currentPath: req.path,
                user: {
                    location: 'Regent Street, A4, A4201, London'
                },
                cart: {
                    items: 23,
                    total: '79.89'
                },
                isRestaurantMenu: true
            });
        } catch (error) {
            // Log the error for debugging
            console.error('Error in restaurantMenu:', error);

            // Render an error page or send a user-friendly error message
            res.status(500).render('error', {
                layout: 'public', // Use a public layout for error pages
                message: 'An error occurred while loading the restaurant menu. Please try again later.',
            });
        }
    }

    // Delivery location page
    async deliveryLocation(req, res) {
        try {
            res.render('delivery-location', {
                title: 'Delivery Location - Food Ordering Website',
                layout: 'minimal', // Use the minimal layout without header and top bar
                currentPath: req.path
            });
        } catch (error) {
            console.error('Error in deliveryLocation:', error);
            res.status(500).send('Internal server error');
        }
    }

    // Update location handler
    async updateLocation(req, res) {
        try {
            const { address, city, postcode, district, subdistrict, note } = req.body;
            
            // Validate required fields
            if (!city || !postcode || !district || !subdistrict) {
                return res.status(400).render('delivery-location', {
                    title: 'Delivery Location - Food Ordering Website',
                    layout: 'user',
                    error: 'Please fill in all required fields',
                    formData: req.body
                });
            }

            // Here you would typically save the location to database/session
            // For now, we'll just update the session
            if (req.session.user) {
                req.session.user.location = `${district}, ${city} ${postcode}`;
            }

            // Redirect back with success message
            res.redirect('/?success=Location updated successfully');
            
        } catch (error) {
            console.error('Error in updateLocation:', error);
            res.status(500).render('delivery-location', {
                title: 'Delivery Location - Food Ordering Website',
                layout: 'user',
                error: 'An error occurred while updating your location'
            });
        }
    }

    async trackOrder(req, res) {
        try {
            res.render('track-order', {
                layout: 'user',
                title: 'Track Order'
            });
        } catch (error) {
            console.error('Error in trackOrder:', error);
            res.status(500).render('error', {
                layout: 'public',
                message: 'An error occurred while loading the track order page. Please try again later.',
            });
        }
    }

    async checkout(req, res) {
        const cart = [
            { image: '/img/food1.jpg', name: 'Braised Mushrooms Feet with Pepper', price: 120000, quantity: 2 },
            { image: '/img/drink1.jpg', name: 'Trà Đá', price: 10000, quantity: 1 },
            { image: '/img/drink2.jpg', name: 'Nước Suối', price: 15000, quantity: 1 },
        ];
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        res.render('checkout', {
            layout: 'user',
            title: 'Checkout',
            cart,
            subtotal,
        });
    }
}

// Exporting an instance of the homeController class
module.exports = new homeController();