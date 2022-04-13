// Import Packages
const nodemailer = require('nodemailer');
// Import Models
const Category = require('../models/Category');
const Furniture = require('../models/Furnitures');
exports.getHomePage = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let furnituresPerPage = 3;
    let totalFurnitures = await Furniture.find().countDocuments();

    const categories = await Category.find().limit(3);
    const furnitures = await Furniture.find().sort('-createdAt')
                              .skip((page-1)*furnituresPerPage)
                              .limit(furnituresPerPage);
    res.status(200).render('index', {
      page_name: 'index',
      categories,
      furnitures,
      current: page,
      pages: Math.ceil(totalFurnitures/furnituresPerPage)
    });
  } catch (error) {
    res.status(400).json({
      status: 'Home page not loaded',
      error,
    });
  }
};

exports.getFurniturePage = async (req, res) => {
  try {
    const categories = await Category.find().limit(3);
    res.status(200).render('furnitures', {
      page_name: 'furnitures',
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Furniture page not loaded',
      error,
    });
  }
};

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact', {
      page_name: 'contact',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Contact page not loaded',
      error,
    });
  }
};

exports.getBlogPage = (req, res) => {
  try {
    res.status(200).render('blog', {
      page_name: 'blog',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Blog page not loaded',
      error,
    });
  }
};

exports.getAboutPage = (req, res) => {
  try {
    res.status(200).render('about', {
      page_name: 'about',
    });
  } catch (error) {
    res.status(400).json({
      status: 'About page not loaded',
      error,
    });
  }
};

exports.getLoginPage = (req, res) => {
  try {
    res.status(200).render('login', {
      page_name: 'login',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Login page not loaded',
    });
  }
};

exports.getRegisterPage = (req, res) => {
  try {
    res.status(200).render('register', {
      page_name: 'register',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Register page not loaded',
    });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    
    let outputMessage = `
    <h1>Message Details</h1>
    <ul>
      <li><h3>Name: </h3>${req.body.name}</li>
      <li><h3>Email: </h3>${req.body.email}</li>
      <li><h3>Phone: </h3>${req.body.phone}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'nodejs.app.test61@gmail.com', // generated ethereal user
      pass: 'Emco32323626', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fixstore Contact Form 👻" <info@fixstore.com>', // sender address
    to: "colakkemre@gmail.com", // list of receivers
    subject: "Fixstore New Message ✔", // Subject line
    text: "Hello world?", // plain text body
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).redirect('/contact');

  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}
