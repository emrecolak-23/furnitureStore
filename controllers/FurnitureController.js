// Import Packages
const fs = require('fs');
// Import Model
const Furniture = require('../models/Furnitures');
const Category = require('../models/Category');
const User = require('../models/User');
const { query } = require('express');

exports.createFurniture = async (req, res) => {
  const furniture = req.body;
  const imageName = req.file.filename;
  furniture.image = imageName;
  furniture.user = req.session.userID;
  try {
    await Furniture.create(furniture);
    req.flash('success', `${furniture.name} has been added successfully`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    let filter = {};
    const query = req.query.search;
    if (query) {
      filter = { name: query };
    }
    if (!query) {
      filter.name = '';
    }
    const furnitures = await Furniture.find({
      $or: [{ name: { $regex: '.*' + filter.name + '.*', $options: 'i' } }],
    }).sort('-createdAt');
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getFurnitureByCategory = async (req, res) => {
  try {
    let filter = {};
    const categorySlug = req.params.categorySlug;
    const category = await Category.findOne({ slug: categorySlug });
    if (categorySlug) {
      filter = { category: category._id };
    }

    // Pagination
    let page = req.query.page || 1;
    let furniturePerPage = 6;
    let totalFurniture = await Furniture.find(filter).countDocuments();

    const furnitures = await Furniture.find(filter)
      .limit(furniturePerPage)
      .skip((page - 1) * furniturePerPage);
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category,
      current: page,
      pages: Math.ceil(totalFurniture / furniturePerPage),
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getOneFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({
      slug: req.params.furnitureSlug,
    })
      .populate('category')
      .populate('user');
    const user = await User.findById(req.session.userID);
    res.status(200).render('furniture-single', {
      page_name: 'furniture',
      furniture,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.deleteFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id);

    await Furniture.findByIdAndRemove(req.params.id);

    let imageFile = __dirname + '/../uploads/' + furniture.image;

    fs.unlinkSync(imageFile);
    req.flash('success', `${furniture.name} has been deleted successfully`);
    res.status(200).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.updateFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findByIdAndUpdate(
      { _id: req.params.id },
      {
        price: req.body.price,
      }
    );
    await furniture.save();
    req.flash(
      'success',
      `${furniture.name} price has been updated successfully`
    );
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.reserveFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.push({ _id: req.body.furniture_id });
    await user.save();
    req.flash('success', `Hey ${user.name}, do you like this furniture:D`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.releaseFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.pull(req.body.furniture_id);
    await user.save();
    req.flash('success', `Hey ${user.name}, why you dont like this furniture?`);
    res.status(200).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
};
