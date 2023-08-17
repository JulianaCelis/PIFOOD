const { filterRecipeByName } = require('./filterRecipeByName.js'); // Asegúrate de tener la ruta correcta al archivo filterRecipeByName.js

const testFilterRecipeByName = async () => {
    try {
        const name = 'Cilantro'; // Coloca aquí el nombre que deseas buscar
        const result = await filterRecipeByName(name);
        console.log('Resultado:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

testFilterRecipeByName();

