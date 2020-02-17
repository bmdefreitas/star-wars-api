const Planeta = require('../models/planeta');

module.exports = {
  async index(req, res) {
    const planetas = await Planeta.find();
    return res.json(planetas);
  },

  async findByName(req, res) {
    const planetas = await Planeta.find({ name: req.query.name });
    return res.json(planetas);
  },

  async show(req, res) {
    const planeta = await Planeta.findById(req.params.id);

    return planeta ? res.json(planeta) : res.status(404).json();
  },

  async create(req, res) {
    const planeta = await Planeta.create(req.body);
    return res.status(201).json(planeta);
  },

  async update(req, res) {
    const planeta = await Planeta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(planeta);
  },

  async remove(req, res) {
    await Planeta.findByIdAndRemove(req.params.id);
    return res.status(204).json();
  },
};
