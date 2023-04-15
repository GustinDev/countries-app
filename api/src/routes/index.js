const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getAllCountries } = require('../controllers/getAllCountries');

const router = Router();

const { Country } = require('../db');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
  try {
    //Esperamos a la respuesta del findAll de Countries.

    const all = await getAllCountries();
    return res.status(200).json(all);

    //Para que funcione sin llamar al controller (es lo mismo):
    // const countries = await Country.findAll();
    // return res.status(200).json(countries);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
