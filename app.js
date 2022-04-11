// Import Packages
const express = require('express');
const ejs = require('ejs');

// Import Routes
const PageRouter = require('./routes/PageRoutes');

// Create express app
const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public')); // use Public folder as a static

// Routes
app.use('/', PageRouter);

// Declare Port Number
const PORT = process.env.PORT || 17000;
app.listen(PORT, ()=> {
  console.log(`Server listened at ${PORT}`);
});