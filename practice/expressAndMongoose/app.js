const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();


const Post = require('./models/post');

// Connect our database
//{useNewUrlParser: true}
mongoose.connect('mongodb://localhost:27017/forum')
    .then(() => {
        console.log("database connected");
    })
    .catch(err => {
        console.log("Database connection error");
        console.log(err);
    })


// Setup path for views directory for our app
app.set('views', path.join(__dirname, 'views'));
// Set the view engine of express to ejs. 
// https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'ejs');

app.get('/posts', async (req, res) => {
    const products = await Post.find({});

    res.render('posts/index', {products});
})

app.listen(3000, () =>{
    console.log("App listening on port 3000");
})