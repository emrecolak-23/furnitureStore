// Import Packages
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
// Import Routes
const PageRouter = require('./routes/PageRoutes');
const FurnitureRouter = require('./routes/FurnitureRoutes');
const CategoryRouter = require('./routes/CategoryRoutes');
const UserRouter = require('./routes/AuthRoutes');

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

// Global Variable
global.userIN = null;
 
// Middlewares
app.use(express.static('public')); // use Public folder as a static
app.use(express.static('uploads')); // use uploads folder a static
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_secret_value',
    resave: false,
    saveUninitialized: true,
  })
);
app.use('*', (req, res, next)=>{
  userIN = req.session.userID;
  next();
});
// Routes
app.use('/', PageRouter);
app.use('/furniture', FurnitureRouter);
app.use('/category', CategoryRouter);
app.use('/user', UserRouter);

// Declare Port Number
const PORT = process.env.PORT || 17000;
app.listen(PORT, () => {
  console.log(`Server listened at ${PORT}`);
});
