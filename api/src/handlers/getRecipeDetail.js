const axios = require('axios');
require('dotenv').config({ path: '../.env' });
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const { Recipe, Diet } = require('../db');

const getRecipeDetail = async (id) => {
    // Si el id incluye '-', busca en la base de datos
    if (id.includes('-')) {
        try {
            const recipeDB = await Recipe.findOne({
                where: { id: id },
                include: { model: Diet },
            });
            return recipeDB;
        } catch (error) {
            return { error: error.message };
        }
    } else {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`);

            const {
                title,
                summary,
                healthScore,
                image,
                analyzedInstructions,
                diets,
            } = response.data;

            // Obtener IDs de las dietas desde la base de datos
            const dietIds = await Diet.findAll({
                where: {
                    name: { [Op.in]: diets },
                },
            });

            const apiRecipe = {
                id: response.data.id,
                title,
                summary,
                healthScore,
                image,
                steps: analyzedInstructions[0]?.steps.map((step) => ({
                    number: step.number,
                    step: step.step,
                })),
                diets: dietIds.map((diet) => ({
                    id: diet.id, // Agregar el ID aquí, si está disponible
                    name: diet.name,
                })),
            };
            return apiRecipe;
        } catch (error) {
            return { error: error.message };
        }
    }
};

module.exports = getRecipeDetail;
