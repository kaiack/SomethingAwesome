const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        content: Joi.string().empty(''),
        image: Joi.string().empty(''),
        likes: Joi.number(),
        category: Joi.string().valid('question', 'fluff', 'announcement', 'general').required(),
    }).required()
})