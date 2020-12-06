const { check, validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.index = (req, res, next) => {
  Post.find({ published: true }, 'title text createdAt')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      return res.json(posts);
    });
};
