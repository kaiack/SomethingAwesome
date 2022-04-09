# Something awesome project

This is my something awesome project for Comp6841. My aim was to learn frontend development and expand my knowledge of backend development as well. 

Of course, since this is a security course, I aim to identify common security issues by describing what they are, how they work and how I have addressed them.

My main notes will be on Notion here:

https://kaiak-something.notion.site/2b23fa029028407ca8efd0a5ea688cf0?v=ed031c134c53455c9f122996e70dcc5b

Deployed on heroku here:\
https://kai-6841-project.herokuapp.com


If you want to run this locally, you will need to have mongod installed, and that process running based on your system.

Check here:
https://www.mongodb.com/docs/guides/server/install/

It can then be run like this (in the root directory):\
`nodemon app.js`

This will run the app on port 3000, accessible in your browser `localhost:3000/`.

Main packages/tools used for this project:
* [Node js](https://nodejs.org/en/)
* [EJS](https://ejs.co/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [passport](https://www.passportjs.org/)
* [joi](https://joi.dev/)
* [bootstrap](https://getbootstrap.com/)


Features:
* Register/Login/Logout, passwords stored as salted hashes.
* Create/Delete/Update your posts, provide an image link from [unsplash](https://unsplash.com/) for your post.

    * Only unsplash is allowed for security reasons, image upload was a planned feature but I ran out of time.
* Like/Unlike posts (same button)
* Comment on posts
* Give your post a category, so that people can see it when looking through them all.

    * Filtering was also a planned feature but was not implemented.

This app is quite basic, but it took a long time to learn everything and there is quite a lot going on behind the scenes (more details are in my notion notes). It really opened my eyes to how many parts go into making something that is relatively simple.
