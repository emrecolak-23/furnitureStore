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

exports.getFurniturePage = (req, res) => {
  try {
    res.status(200).render('furnitures', {
      page_name: 'furnitures'
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