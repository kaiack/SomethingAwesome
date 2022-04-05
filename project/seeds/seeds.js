const mongoose = require('mongoose');
const Post = require('../models/post');
const { uniqueNamesGenerator, adjectives, starWars, animals} = require('unique-names-generator');

mongoose.connect('mongodb://localhost:27017/forum');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error when connecting:"));
db.once("open", () => {
    console.log("database connected");
})

categories = ['question', 'fluff', 'announcement', 'general'];

const randomCategory = () => {
    return categories[Math.floor(Math.random()*categories.length)];
}

const seedDB = async() => {
    await Post.deleteMany({});
    for (let i=0; i<25; i++){
        const p = new Post({
            title: uniqueNamesGenerator({dictionaries: [animals], length: 1}),
            author: "62455b8f0727b4798fc1b189",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: [],
            image: 'https://source.unsplash.com/collection/856079',
            category: randomCategory(),
            comments: []
        });
        await p.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});