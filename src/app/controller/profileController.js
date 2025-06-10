const path = require('path');

module.exports = {
  getEditProfile: (req, res) => {
    res.render('edit-profile', {
      layout: 'user',
      title: 'Edit Profile',
      user: req.user || {},
    });
  },
  postEditProfile: (req, res) => {
    // For now, just log the form data and redirect
    console.log('Profile form data:', req.body);
    if (req.file) {
      console.log('Uploaded file:', req.file.filename);
    }
    res.redirect('/profile');
  },
  getHistory: (req, res) => {
    const orders = [
      {
        image: '/img/food1.jpg',
        name: 'Braised Mushrooms Feet with Pepper',
        orderedTime: '2024-06-01 12:30',
        quantity: 2,
        price: 120000,
        status: 'Shipped',
        receivedTime: '2024-06-03 15:00',
      },
      {
        image: '/img/drink1.jpg',
        name: 'Trà Đá',
        orderedTime: '2024-06-02 18:00',
        quantity: 1,
        price: 10000,
        status: 'Ordered',
      },
      {
        image: '/img/drink2.jpg',
        name: 'Nước Suối',
        orderedTime: '2024-06-02 18:00',
        quantity: 1,
        price: 15000,
        status: 'Shipped',
        receivedTime: '2024-06-04 10:00',
      },
    ];
    res.render('history', {
      layout: 'user',
      title: 'Order History',
      orders,
    });
  },
}; 