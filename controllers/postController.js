const { check, validationResult } = require('express-validator');
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
  Post.find({ published: false }, 'title text createdAt')
    .exec()
    .then(posts => {
      if (!posts.length) return res.status(404).end();
      return res.status(200).json(posts);
    })
    .catch(err => res.json(err));
};

exports.create = (req, res, next) => {
  const errors = validationResult(req);

  const post = new Post(req.body);

  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  return post.save()
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err));
};

exports.show = (req, res, next) => {
  Post.findById(req.params.id)
    .exec()
    .then(post => {
      if (!post) return res.status(404).end();
      return res.status(200).json(post);
    })
    .catch(err => res.json(err));
};

exports.update = (req, res, next) => {
  const errors = validationResult(req);

  const data = {
    _id: req.params.id,
    ...req.body,
  };

  if (!errors.isEmpty()) return res.status(400).json({ data, errors: errors.array() });

  return Post.findByIdAndUpdate(req.params.id, data, {})
    .exec()
    .then(post => {
      if (!post) return res.status(404).end();
      return res.status(200).json(data);
    })
    .catch(err => res.json(err));
};

exports.destroy = (req, res, next) => {
  Post.findById(req.params.id)
    .exec()
    .then(post => {
      if (!post) return res.status(404).end();
      post.remove();
      return res.status(200).json(post);
    })
    .catch(err => res.json(err));
};
