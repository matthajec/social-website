exports.getHome = (req, res) => {
  res.render('home.ejs', {
    docTitle: 'Home',
    pageCategory: 'home'
  });
}