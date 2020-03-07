import express from 'express';

import planetasRoutes from './planetas';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

router.use('/v1/planetas', planetasRoutes);

export default router;
