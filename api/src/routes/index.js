const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getAllCountries } = require('../controllers/getAllCountries');
const { getDetailCountry } = require('../controllers/getDetailCountry');

const router = Router();

const { Country } = require('../db');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET ALL
router.get('/countries', async (req, res) => {
  try {
    //Esperamos a la respuesta del findAll de Countries.
    const all = await getAllCountries();
    return res.status(200).json(all);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//GET - DETAIL
router.get('/countries/:idCountry', async (req, res) => {
  //Toma el ID de la URL y lo guarda en params.
  const { idCountry } = req.params;
  try {
    //Se lo pasamos al controller y retornamos la respuesta.
    const countryDetail = await getDetailCountry(idCountry);
    return res.status(200).json(countryDetail);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
