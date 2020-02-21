/**
 * Swapi Service
 * @module Swapi
 */

const fetch = require('node-fetch');

const urlApi = process.env.SWAPIURL || 'https://swapi.co/api/';

/**
 * Busca pelo nome do planeta na Api do Star Wars
 * @param {string} name - Nome do Planeta a ser procurado.
 * @return {Object} resposta.
 */
const findByName = async (name) => {
  const res = await fetch(`${urlApi}planets?search=${name}`, { timeout: 3000 });

  return res.json();
};

/**
 * informa a quantidade de aparicoes em filmes informados pela Api do Star Wars
 * @param {string} name - Nome do Planeta a ser procurado.
 * @return {number} quantidades de aparicoes em filmes.
 */
const getQtdeAparicoesFilmes = async (name) => {
  const res = await findByName(name);

  const planeta = res.count ? res.results[0] : null;

  return planeta ? planeta.films.length : 0;
};

module.exports = {
  findByName,
  getQtdeAparicoesFilmes,
};
