const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require('./country');
const activity = require('./country');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//DEFINIMOS LAS RUTAS (para cada table).
//Cada que algo llegue a la ruta raiz "/" le indicamos que puede ser manejado por esos routes.
router.use('/', country);
router.use('/', activity);

module.exports = router;
