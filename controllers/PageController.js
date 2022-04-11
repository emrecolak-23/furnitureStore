exports.getHomePage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index'
  });
}

exports.getFurniturePage = (req, res) => {
  res.status(200).render('furnitures', {
    page_name: 'furnitures'
  });
}

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact'
  });
}

exports.getBlogPage = (req, res) => {
  res.status(200).render('blog', {
    page_name: 'blog'
  });
}

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about'
  });
}