/* eslint-disable consistent-return */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      }

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

router.post('login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(
        req.body.password,
        user.password,
        (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth failed',
            });
          }
          if (result) {
            const token = jwt.sign(
              { email: user.email, userId: user._id },
              'JWT_SECRET',
              { expiresIn: '1h' },
            );
            return res.status(200).json({
              message: 'Auth successful',
              token,
            });
          }
        },
      );
    })
    .catch(err => res.status(500).json({
      error: err,
    }));
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
