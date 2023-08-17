require('dotenv').config({ path: '../../.env' });
const { API_KEY } = process.env;
const {apikey} = require('../../apiCliente');
const axios = require('axios');
const { Recipe, Diet } = require('../../db');
const { Op } = require('sequelize');


const getAllApiRecipes = async () => {
    try {
        const apiRecipesResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&addRecipeInformation=true&number=100`);
        const apiRecipes = apiRecipesResponse.data.results;

        const processedRecipes = [];
        for (const item of apiRecipes) {
            const { title, image, summary, healthScore, id } = item;
            const diets = item.diets;

            const formattedDiets = [];
            for (const dietName of diets) {
                const diet = await Diet.findOne({ where: { name: dietName } });
                if (diet) {
                    formattedDiets.push({
                        name: diet.name,
                        id: diet.id,
                    });
                }
            }

            const recipe = {
                id, 
                title,
                summary,
                healthScore,
                image,
                steps: item.analyzedInstructions?.flatMap((step) =>
                    step.steps.map((step) => ({
                        number: step.number,
                        step: step.step,
                    }))
                ),
                diets: formattedDiets,
            };

            processedRecipes.push(recipe);
        }

        return processedRecipes;

    } catch (error) {
        console.error('Error al obtener y procesar las recetas de la API:', error);
        throw error;
    }
};

module.exports = getAllApiRecipes;
