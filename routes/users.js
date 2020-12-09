const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/me', (req, res, next) => {
  res.send('Othmane Namani');
});

module.exports = router;
