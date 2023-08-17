const { Op } = require('sequelize');
const { Recipe } = require('../db');
const getAllRecipes = require('../controllers/recipes/getAllRecipes');

const filterRecipeByName = async (name) => {
    try {
        if (!name) {
            // Si el nombre está vacío, obtén todas las recetas
            return await getAllRecipes();
        }

        const allRecipes = await getAllRecipes();

        const filteredRecipes = allRecipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(name.toLowerCase())
        );

        return filteredRecipes;
    } catch (error) {
        console.error('Error al buscar recetas por nombre:', error);
        throw new Error('No se pudo realizar la búsqueda de recetas por nombre.');
    }
};

module.exports = filterRecipeByName;
