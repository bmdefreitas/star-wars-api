/**
 * Planeta Controller
 * @module PlanetaController
 */

const Planeta = require('../models/planeta');

const swapiService = require('../services/swapi');

module.exports = {
  /**
   * Lista todos os planetas
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   * @return {Array} lista com todos os planetas
   */
  async index(req, res) {
    try {
      const planetas = await Planeta.find();

      return res.json(planetas);
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  /**
   * Busca pelo nome do planeta
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   * @return {Array} lista com os planetas encontrados
   */
  async findByName(req, res) {
    try {
      const planetas = await Planeta.find({ nome: req.query.nome });

      return res.json(planetas);
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  /**
   * Busca pelo ID do planeta
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   * @return {Planeta} planeta encontrado pelo ID
   */
  async show(req, res) {
    try {
      const planeta = await Planeta.findById(req.params.id);

      return planeta ? res.json(planeta) : res.status(404).json();
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  },

  /**
   * Cria um planeta
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   * @return {Planeta} planeta salvo
   */
  async create(req, res) {
    try {
      const planeta = req.body;

      planeta.qtdeAparicoesFilmes = await swapiService.getQtdeAparicoesFilmes(planeta.nome);

      const planetaSalvo = await Planeta.create(planeta);

      return res.status(201).json(planetaSalvo);
    } catch (err) {
      const { message } = err;
      return res.status(422).json({ message });
    }
  },

  /**
   * Atualiza um planeta pelo ID
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   * @return {Planeta} planeta atualizado
   */
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

  /**
   * Remove um planeta pelo ID
   * @param {Object} req - Requisicao.
   * @param {Object} res - Resposta.
   */
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
