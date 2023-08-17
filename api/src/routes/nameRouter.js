const express = require('express');
const nameRouter = express.Router();

const { filterRecipeByName } = require('../controllers/recipes/index.js');

nameRouter.get('/nombres', async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
          throw new Error('El parámetro "name" es requerido.');
        }
    
        const recipes = await filterRecipeByName(name); // Usa filterRecipeByName como función
        res.status(200).json(recipes);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });


module.exports = nameRouter;
