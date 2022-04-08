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

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
</svg>