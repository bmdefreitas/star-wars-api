const Planeta = require('../models/planeta');

module.exports = {
  async index(req, res) {
    try {
      const planetas = await Planeta.find();

      return res.json(planetas);
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  async findByName(req, res) {
    try {
      const planetas = await Planeta.find({ name: req.query.name });

      return res.json(planetas);
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  async show(req, res) {
    try {
      const planeta = await Planeta.findById(req.params.id);

      return planeta ? res.json(planeta) : res.status(404).json();
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  async create(req, res) {
    try {
      const planeta = await Planeta.create(req.body);

      return res.status(201).json(planeta);
    } catch (err) {
      const { message } = err;
      return res.status(422).json({ message });
    }
  },

  async update(req, res) {
    try {
      const planeta = await Planeta.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.json(planeta);
    } catch (err) {
      const { message } = err;
      return res.status(422).json({ message });
    }
  },

  async remove(req, res) {
    try {
      await Planeta.deleteOne({ _id: req.params.id });

      return res.status(204).json();
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },
};
