const Category = require("../models/Category");

exports.getHomePage = (req, res) => {
  try {
    res.status(200).render('index', {
      page_name: 'index'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Home page not loaded',
      error
    });
  }
}

exports.getFurniturePage = async (req, res) => {
  try {
    const categories = await Category.find().limit(3)
    res.status(200).render('furnitures', {
      page_name: 'furnitures',
      categories
    });
  } catch(error) {
    res.status(400).json({
      status: 'Furniture page not loaded',
      error
    });
  }
  
}

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact', {
      page_name: 'contact'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Contact page not loaded',
      error
    });
  }
}

exports.getBlogPage = (req, res) => {
  try {
    res.status(200).render('blog', {
      page_name: 'blog'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Blog page not loaded',
      error
    });
  }
}

exports.getAboutPage = (req, res) => {
  try {
    res.status(200).render('about', {
      page_name: 'about'
    });
  } catch(error) {
    res.status(400).json({
      status: 'About page not loaded',
      error
    });
  }
}

exports.getLoginPage = (req, res) => {
  try{
    res.status(200).render('login', {
      page_name: 'login'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Login page not loaded'
    });
  }
}

exports.getRegisterPage = (req, res) => {
  try {
    res.status(200).render('register', {
      page_name:'register'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Register page not loaded'
    });
  }
}