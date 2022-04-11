// Import Packages
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

// Import Routes
const PageRouter = require('./routes/PageRoutes');
const FurnitureRouter = require('./routes/FurnitureRoutes');
const CategoryRouter = require('./routes/CategoryRoutes');

// Create express app
const app = express();

// DB Connect
const dbURI =
  'mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/furniture-store?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Db connected');
  })
  .catch((err) => {
    console.log(err);
  });


// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public')); // use Public folder as a static
app.use(express.static('uploads')); // use uploads folder a static
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Routes
app.use('/', PageRouter);
app.use('/furniture', FurnitureRouter);
app.use('/category', CategoryRouter);


// Declare Port Number
const PORT = process.env.PORT || 17000;
app.listen(PORT, ()=> {
  console.log(`Server listened at ${PORT}`);
});