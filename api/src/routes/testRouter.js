const express = require('express');
const app = express();

const { filterRecipeByName } = require('../controllers/recipes/index.js');

// Simulación de un middleware para agregar parámetro name a la solicitud
app.use('/name', (req, res, next) => {
  req.query = {
    name: 'Cilantro' // Cambia esto al nombre que deseas probar
  };
  next();
});

// // Simulación de una función filterRecipeByName
// async function filterRecipeByName(name) {
//   // Aquí debería ir tu lógica real para filtrar recetas por nombre
//   // Por ahora, simulamos una respuesta de recetas
//   return [{ name: 'Receta1' }, { name: 'Receta2' }];
// }

// Ruta que deseas probar
app.get('/name', async (req, res) => {
    try {
      const name = req.query.name;
      if (!name) {
        throw new Error('El parámetro "name" es requerido.');
      }
  
      const recipes = await filterRecipeByName.filterRecipeByName(name); 
      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
// Ejecutar el servidor en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
