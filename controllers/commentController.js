const { check, validationResult } = require('express-validator');
const Comment = require('../models/Comment');

exports.validations = [
  check('text', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  check('name', 'Commenter name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  check('email', 'Commenter email must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

exports.index = (req, res, next) => {
  Comment.find('text commenter createdAt')
    .exec()
    .then(comments => {
      if (!comments.length) return res.status(404).end();
      return res.status(200).json(comments);
    })
    .catch(err => res.json(err));
};

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  const comment = new Comment({
    text: req.body.text,
    commenter: {
      name: req.body.name,
      email: req.body.email,
    },
    post: req.params.postId,
  });

  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  return comment.save()
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json(err));
};

exports.show = (req, res, next) => {
  Comment.findById(req.params.id)
    .exec()
    .then(comment => {
      if (!comment) return res.status(404).end();
      return res.status(200).json(comment);
    })
    .catch(err => res.json(err));
};
exports.update = (req, res, next) => {
  const errors = validationResult(req);

  const data = {
    text: req.body.text,
    commenter: {
      name: req.body.name,
      email: req.body.email,
    },
    _id: req.params.id,
  };

  if (!errors.isEmpty()) return res.status(400).json({ data, errors: errors.array() });

  return Comment.findByIdAndUpdate(req.params.id, data, {})
    .exec()
    .then(comment => {
      if (!comment) return res.status(404).end();
      return res.status(200).json(data);
    })
    .catch(err => res.json(err));
};

exports.destroy = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .exec()
    .then(comment => {
      if (!comment) return res.status(404).end();
      return res.status(200).json(comment);
    })
    .catch(err => res.json(err));
};
