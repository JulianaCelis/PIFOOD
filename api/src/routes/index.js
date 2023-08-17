const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipesRouter")
const dietsRouter = require("./dietsRouter")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);


router.use((req, res, next) => {
    console.log('Ruta no encontrada:', req.originalUrl); 
    res.status(404).json({ error: 'Ruta no encontrada' });
});


  
module.exports = router;
