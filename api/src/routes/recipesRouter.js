// recipesRouter.js

const express = require('express');
const recipesRouter = express.Router();
const { getAllApiRecipes, getAllRecipes } = require('../controllers/recipes/index.js');
const {postDataRecipe, getRecipeDetail, filterRecipeByName, removeRecipeById} = require('../handlers/index.js');
// Modificar la función filterRecipeById para obtener la receta por ID desde la API


recipesRouter.get('/name', async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      throw new Error('El parámetro "name" es requerido.');
    }

    const recipes = await filterRecipeByName(name); 
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

recipesRouter.get('/:idRecipe', async (req, res, next) => {
  const { idRecipe } = req.params;
  try {
    const recipe = await getRecipeDetail(idRecipe);
    res.json(recipe);
  } catch (error) {
    console.error('Error al obtener la receta por ID desde la API:', error);
    next(error);
  }
});

recipesRouter.delete('/:id', async (req, res) => {
  const idToDelete = req.params.id;

  try {
    const result = await removeRecipeById(idToDelete);
    res.json({ message: result });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ message: 'Error al eliminar la receta' });
  }
});

// Modificar la función filterRecipeByName para obtener las recetas desde la API


recipesRouter.get('/', async (req, res) => {
  try {
    const allRecipes = await getAllRecipes();
    res.json(allRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
});


// Agregar la función postRecipe 

recipesRouter.post("/", async (req, res, next) => {
  try {
    const newRecipe = req.body;
    const createdRecipe = await postDataRecipe(newRecipe); 
    res.status(200).json(createdRecipe);
  } catch (error) {
    console.log("No se pudo crear la receta en la base de datos")
    next(error);
  }
});

module.exports = recipesRouter;
