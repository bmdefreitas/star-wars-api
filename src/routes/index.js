const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

module.exports = router;
