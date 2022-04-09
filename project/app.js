if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const app = express();
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const ExpressError = require('./helpers/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

// This allows us to send put, delete etc updates from html forms.
const methodOverride = require('method-override');

// Options {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}

const mongoUrl = process.env.mongoURL;
// console.log(mongoUrl);
// 'mongodb://localhost:27017/forum'
mongoose.connect(mongoUrl);
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));
app.use(mongoSanitize());

const scriptSrcUrls = [
    "https://cdn.jsdelivr.net",
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [];
const fontSrcUrls = ["https://cdn.jsdelivr.net"];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://images.unsplash.com/",
                "https://source.unsplash.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



const sessionConfig = {
    name: "huehueuhueuh",
    secret: 'urmumhaha',
    resave: false, // These two are to avoid deprecation warnings.
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + (1000*60*60), // expires in an hour
        maxAge: Date.now() + (1000*60*60),
        // secure:true,
        httpOnly: true
    }
    //store: We need to change this!!!
}
app.use(session(sessionConfig));

// From passport docs, session needs to be used before passport.session.
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045
app.use(passport.initialize());
app.use(passport.session());

// This tells passport to use the 'Local Strategy' and the authentication method for that is located on our User model 
//and is called authenticate. We did not define this method, it came from passport-local-mongoose and was automatically added to our user model.
passport.use(new passportLocal(User.authenticate()))

// Serialization is for 'getting' the user data in and out of a session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

// globals things that we have access to in each template.
app.use((req, res, next) =>{
    res.locals.success = req.flash('success');
    res.locals.error= req.flash('error');
    res.locals.user = req.user; // Passport makes req.user available.
    next();
});

app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) =>{
    res.render('home');
})

// If we recieve a request that does not match any of the above
app.use('*', (req, res, next)=>{
    next(new ExpressError('Page not found', 404));
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
