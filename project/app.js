const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const app = express();
const morgan = require('morgan');
const Post = require('./models/post');
const Comment = require('./models/comment');
const {postSchema, commentSchema} = require('./schemas.js')
const postRoutes = require('./routes/posts');
const catchAsync = require('./helpers/catchAsync');
const ExpressError = require('./helpers/ExpressError');

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

app.use('/posts', postRoutes);

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
