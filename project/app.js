const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const Post = require('./models/post');

// Options {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost:27017/forum');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error when connecting:"));
db.once("open", () => {
    console.log("database connected successfully");
})



// Setup path for views directory for our app
app.set('views', path.join(__dirname, 'views'));
// Set the view engine of express to ejs. 
// https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: true}));

app.listen(3000, () =>{
    console.log("App listening on port 3000");
})


app.get('/', (req, res)=>{
    res.render("home.ejs");
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index.ejs', {posts});
})


app.get('/posts/new', (req, res) =>{
    res.render('posts/new.ejs');
})

app.post('/posts', async (req, res) =>{
    res.send(req.body);
})

app.get('/posts/:id', async (req, res) =>{
    const {id} = req.params;
    //console.log(id);
    const post = await Post.findById(id);
    res.render('posts/show', {post});
})

