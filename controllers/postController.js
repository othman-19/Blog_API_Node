const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.validations = [
  check('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  check('text', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

exports.index = (req, res, next) => {
  Post.find({ published: true }, 'title text createdAt')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      return res.json(posts);
    });
};

exports.show = (req, res, next) => {
  Post.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
    .exec()
    .then(post => {
      if (!post) {
        return next({ message: 'The post was not found.' });
      }
      return res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
};
