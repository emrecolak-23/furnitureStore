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
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    let filter = {}
    const query = req.query.search
    if (query) {
      filter = {name: query}
    }
    if (!query) {
      filter.name = ""
    }
    const furnitures = await Furniture.find({
      $or: [
        {name: {$regex: ".*"+filter.name+".*", $options:"i"}}
      ]
    }).sort('-createdAt');
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category: null
    })
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
    const furnitures = await Furniture.find(filter);
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category,
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

    res.status(200).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
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
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.reserveFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.push({_id:req.body.furniture_id});
    await user.save();
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}

exports.releaseFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.pull(req.body.furniture_id);
    await user.save();
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}