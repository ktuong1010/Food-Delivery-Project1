const express = require('express');
const path = require('path');
const profileRouter = require('./routes/profile');

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'handlebars');

// Register your routers
app.use('/profile', profileRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 