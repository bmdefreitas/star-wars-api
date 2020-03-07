import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'Star Wars Api' });
});

export default router;
