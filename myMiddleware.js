const {postSchema} = require('./schemas.js')
const ExpressError = require('./helpers/ExpressError');
const Post = require('./models/post');
const {commentSchema} = require('./schemas.js')
const Comment = require('./models/comment');

module.exports.isLoggedIn =  (req, res, next) => {
    // req.user will contain deserialised information from the session.

    if (!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl;
      req.flash('error', "You must be logged in!");
      return res.redirect('/login');
    }
    next();
}


module.exports.validatePost = (req, res, next) =>{
  const {error} = postSchema.validate(req.body);
  if (error){
      const msg = error.details.map(i => i.message).join(',');
      throw new ExpressError(msg, 400);
  }
  // Need to call next or we will just get stuck here.
  next();
}

module.exports.checkPostAuthor = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!req.user || !post.author.equals(req.user._id)) {
      req.flash("error", "You are not authorised to do this.")
      return res.redirect(`/posts/${req.params.id}`);
  }
  next();
}

module.exports.checkCommentAuthor = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!req.user || !comment.author.equals(req.user._id)) {
      req.flash("error", "You are not authorised to do this.")
      return res.redirect(`/posts/${req.params.id}`);
  }
  next();
}


module.exports.validateComment = (req, res, next) =>{
  const {error} = commentSchema.validate(req.body);
  if (error){
      const msg = error.details.map(i => i.message).join(',');
      throw new ExpressError(msg, 400);
  }
  // Need to call next or we will just get stuck here.
  next();
}