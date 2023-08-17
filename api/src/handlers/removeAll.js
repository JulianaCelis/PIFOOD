const { Recipe, Diet } = require('../db');

const removeAllRecipes = async () => {
  try {
    // Eliminar todas las recetas en la base de datos
    await Recipe.destroy({
      where: {},
      truncate: true
    });

    return 'Todas las recetas han sido eliminadas exitosamente';
  } catch (error) {
    console.error('Error al eliminar las recetas:', error);
    throw error;
  }
};

async function main() {
  try {
    const result = await removeAllRecipes();
    console.log(result);

    const remainingRecipes = await Recipe.count(); // Cuenta las recetas restantes en la base de datos
    console.log(`Recetas restantes en la base de datos: ${remainingRecipes}`);
  } catch (error) {
    console.error('Error general:', error);
  }
}

// Llamamos a la función principal para comenzar el proceso de eliminación
main();
