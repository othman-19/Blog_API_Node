const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/me', (req, res, next) => {
  res.send('Othmane Namani');
});

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    // eslint-disable-next-line consistent-return
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      }
      // eslint-disable-next-line consistent-return
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
        });
        user.save()
          .then(result => res.status(201).json({
            message: 'User created',
          }))
          .catch(err => res.status(500).json({
            error: err,
          }));
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
