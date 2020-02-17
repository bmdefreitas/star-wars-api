const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

module.exports = router;
