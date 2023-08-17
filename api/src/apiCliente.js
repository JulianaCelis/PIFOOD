const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
const apikey = "e2569a8398924e7dbe7f62fb70e4a477";
const { Op } = require('sequelize');
const { Recipe, Diet } = require('./db');


const getApiRecipes = async () => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey,
        number: 100,
        addRecipeInformation: true,
      },
    });

    const apiRecipes = response.data.results;
    return apiRecipes;
  } catch (error) {
    console.error('Error al obtener las recetas desde la API:', error);
    throw error;
  }
};



const getApiRecipeById = async (id) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey,
      },
    });

    const recipe = response.data;
    return recipe;
  } catch (error) {
    throw new Error(`No existe la receta con ID: ${id}`);
  }
};

const postRecipe = async (recipeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/recipes`, recipeData);
    const createdRecipe = response.data;
    return createdRecipe;
  } catch (error) {
    console.error('Error al crear la receta desde la API:', error);
    throw error;
  }
}

// const transformRecipe = (apiRecipe) => {
//   return {
//     id: apiRecipe.id.toString(),
//     title: apiRecipe.title,
//     summary: apiRecipe.summary,
//     healthScore: apiRecipe.healthScore,
//     steps: apiRecipe.analyzedInstructions[0]?.steps?.map(step => step.step) || [],
//     image: apiRecipe.image,
//     diets: apiRecipe.diets.map(dietName => dietName),
//   };
// };

// const getAllApiRecipes = async (API_KEY) => {
//   try {
//       const apiRecipesResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
//       const apiRecipes = apiRecipesResponse.data.results;

//       for (const item of apiRecipes) {
//           const { title, image, summary, healthScore, id } = item;
//           const diets = item.diets; // Obtén las dietas directamente del item

//           const formattedDiets = await Diet.findAll({
//               where: {
//                   name: { [Op.in]: diets },
//               },
//           });

//           const recipe = {
//               title,
//               summary,
//               healthScore,
//               image,
//               steps: item.analyzedInstructions?.flatMap((step) =>
//                   step.steps.map((step) => ({
//                       number: step.number,
//                       step: step.step,
//                   }))
//               ),
//               diets: formattedDiets, // Usar las dietas formateadas con objetos completos
//           };

//           const createdRecipe = await Recipe.create(recipe);

//           await createdRecipe.addDiet(formattedDiets);
//       }

//       const recipeData = await Recipe.findAll({
//           attributes: ['id', 'title', 'image', 'summary', 'healthScore', 'steps'],
//           include: { model: Diet },
//       });

//       return recipeData;
//   } catch (error) {
//       console.error('Error al obtener y almacenar las recetas:', error);
//       throw error;
//   }
// };



// const getDietTypesFromRecipes = async () => {
//   try {
//     const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
//       params: {
//         apiKey,
//         number: 100, // Puedes ajustar el número según tus necesidades
//         addRecipeInformation: true,
//       },
//     });

//     const apiRecipes = response.data.results;
//     const dietTypesSet = new Set();

//     apiRecipes.forEach((recipe) => {
//       if (recipe.vegetarian) {
//         dietTypesSet.add('vegetarian');
//       }

//       if (recipe.vegan) {
//         dietTypesSet.add('vegan');
//       }

//       if (recipe.glutenFree) {
//         dietTypesSet.add('glutenFree');
//       }

//       // Verificar las dietas adicionales incluidas en la propiedad 'diets'
//       if (recipe.diets && Array.isArray(recipe.diets)) {
//         recipe.diets.forEach((diet) => {
//           dietTypesSet.add(diet);
//         });
//       }
//     });

//     const dietTypes = Array.from(dietTypesSet);
//     return dietTypes;
//   } catch (error) {
//     console.error('Error al obtener los tipos de dieta desde la API:', error);
//     throw error;
//   }
// };

module.exports = {
  getApiRecipes,
  getApiRecipeById,
  postRecipe,
  // getAllApiRecipes,
  // getDietTypesFromRecipes
  apikey,
};
