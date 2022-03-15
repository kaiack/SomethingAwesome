const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const app = express();
const morgan = require('morgan');
const Post = require('./models/post');
const Comment = require('./models/comment');
const {postSchema} = require('./schemas.js')

const catchAsync = require('./helpers/catchAsync');
const ExpresError = require('./helpers/ExpressError');

// This allows us to send put, delete etc updates from html forms.
const methodOverride = require('method-override');
const res = require('express/lib/response');

// Options {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost:27017/forum');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error when connecting:"));
db.once("open", () => {
    console.log("database connected successfully");
})



// Setup path for views directory for our app
app.set('views', path.join(__dirname, 'views'));

// Set the view engine of express to ejs and use ejs-mate engine for layouts.
// https://expressjs.com/en/guide/using-template-engines.html
// https://www.npmjs.com/package/ejs-mate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// Our middleware functions
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));


const validatePost = (req, res, next) =>{
    const {error} = postSchema.validate(req.body);
    if (error){
        const msg = error.details.map(i => i.message).join(',');
        throw new ExpresError(msg, 400);
    }
    // Need to call next or we will just get stuck here.
    next();
}



/*
    ------------    ROUTES   ------------
*/



app.get('/', (req, res)=>{
    res.render("home.ejs");
});

app.get('/posts', catchAsync(async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index.ejs', {posts});
}));


app.get('/posts/new', (req, res) =>{
    res.render('posts/new.ejs');
});


app.post('/posts', validatePost, catchAsync(async (req, res) =>{
    const post = new Post(req.body.post);
    console.log(req.body.post);
    await post.save();
    res.redirect(`/posts/${post._id}`);
}));

app.get('/posts/:id', catchAsync(async (req, res) =>{
    const {id} = req.params;
    //console.log(id);
    const post = await Post.findById(id);
    res.render('posts/show', {post});
}));

app.get('/posts/:id/edit', catchAsync(async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    res.render('posts/edit', {post});
}));

app.put('/posts/:id', validatePost, catchAsync(async(req, res) =>{
    // console.log("EDDITEED")
    const post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.redirect(`/posts/${req.params.id}`);
}));

app.delete('/posts/:id', catchAsync(async(req, res) =>{
    console.log("DELETEEETDDD")
    // res.send("DELETINGHEHEH")
    await Post.findByIdAndDelete(req.params.id);
    res.redirect(`/posts`);
}));

app.post('/posts/:id/comments', catchAsync(async(req, res)=>{
    console.log("HERE")
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    post.comments.push(comment);
    await comment.save();
    await post.save();
    res.redirect(`/posts/${post._id}`);
}))

// If we recieve a request that does not match any of the above
app.use('*', (req, res, next)=>{
    next(new ExpresError('Page not found', 404));
})

app.use((err, req, res, next) =>{
    const {statusCode = 500, message="UH OH!!!"} = err;
    if (!err.message) {
        err.message = "UH OH!!! :(";
    }
    if (!err.statusCode) err.statusCode = 500;
    res.status(statusCode).render('error', {err});
});

app.listen(3000, () =>{
    console.log("App listening on port 3000");
});
