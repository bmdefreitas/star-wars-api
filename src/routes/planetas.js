import express from 'express';

import PlanetaController from '../controllers/planeta';

const router = express.Router();

router.get('/', PlanetaController.index);

router.get('/search', PlanetaController.findByName);

router.get('/:id', PlanetaController.show);

router.post('/', PlanetaController.create);

router.put('/:id', PlanetaController.update);

router.delete('/:id', PlanetaController.remove);

export default router;
