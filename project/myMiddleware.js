module.exports.isLoggedIn =  (req, res, next) => {
    // req.user will contain deserialised information from the session.

    if (!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl;
      req.flash('error', "You must be logged in!");
      return res.redirect('/login');
    }
    next();
}