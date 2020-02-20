const express = require('express');

const planetasRoutes = require('./planetas');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

router.use('/v1/planetas', planetasRoutes);

module.exports = router;
