const getAllApiRecipes = require('./getAllApiRecipes');
const getAllDbRecipes = require('./getAllDbRecipes');

const getAllRecipes = async () => {
    //se trae todas las recetas de la API
    const apiRecipe = await getAllApiRecipes();
    //se trae todas las recetaas de la base de datos
    const dbRecipe = await getAllDbRecipes();

    //se almacena la union de los dos resultados en una constante 
    const allRecipes = [...apiRecipe, ...dbRecipe];
    return allRecipes;
};

module.exports = getAllRecipes