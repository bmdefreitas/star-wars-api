const express = require('express');

const router = express.Router();
const planetasRoutes = require('./planetas');

router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

router.use('/v1/planetas', planetasRoutes);

module.exports = router;
