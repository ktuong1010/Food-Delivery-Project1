const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const app = express();
const port = 4000;
const route = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(session({
  secret: 'x7k9mPqW3zT2rY8nJ5vL0bF6tH', // Replace with a secure key
  resave: false,
  saveUninitialized: false
}));
const hbs = exphbs.create({
  
  layoutsDir: path.join(__dirname, 'resources/views/layouts'),
  partialsDir: path.join(__dirname, 'resources/views/partials'),
  defaultLayout: 'user' // Default to user layout
});
//Template engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to determine user role (example)

route(app);



app.listen(port, () => {    
  console.log(`Example app listening at http://localhost:${port}`);
});