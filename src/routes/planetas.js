const express = require('express');

const PlanetaController = require('../controllers/planeta');

const router = express.Router();

router.get('/', PlanetaController.index);

router.get('/search', PlanetaController.findByName);

router.get('/:id', PlanetaController.show);

router.post('/', PlanetaController.create);

router.put('/:id', PlanetaController.update);

router.delete('/:id', PlanetaController.remove);

module.exports = router;
