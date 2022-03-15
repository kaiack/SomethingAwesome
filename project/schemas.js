const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        content: Joi.string(),
        image: Joi.string(),
        likes: Joi.number(),
        category: Joi.string().allow('question', 'fluff', 'announcement', 'general').required()
    }).required()
})