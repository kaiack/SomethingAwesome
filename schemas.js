const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().empty(''),
        content: Joi.string().empty(''),
        image: Joi.string().empty(''),
        category: Joi.string().valid('question', 'fluff', 'announcement', 'general').required(),
    }).required()
})


module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        content: Joi.string().required(),
    }).required()
})