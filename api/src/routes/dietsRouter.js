const express = require('express');
const { Diet } = require('../db');
const { Op } = require('sequelize');

const dietsRouter = express.Router();

// Ruta para obtener todas las dietas
dietsRouter.get('/', async (req, res, next) => {
  try {
    const dietasPredefinidas = ['vegetarian', 'glutenFree'];

    // Obtener todas las dietas de la base de datos
    const existingDiets = await Diet.findAll();

    // Filtrar las dietas predefinidas que no están en la base de datos
    const dietasNoExisten = dietasPredefinidas.filter((dietaPredefinida) => {
      return !existingDiets.some((existingDiet) => existingDiet.name === dietaPredefinida);
    });

    // Agregar las dietas predefinidas que no están en la base de datos
    for (const dietName of dietasNoExisten) {
      await Diet.create({ name: dietName });
    }

    // Obtener todas las dietas, incluyendo las predefinidas y las de la base de datos
    const todasLasDietas = await Diet.findAll();

    // Devolver el resultado como respuesta
    const dietsArray = todasLasDietas
  
    res.json(dietsArray);
  } catch (error) {
    next(error);
  }
});

module.exports = dietsRouter;
