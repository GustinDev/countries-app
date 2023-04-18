const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getAllCountries } = require('../controllers/getAllCountries');
const { getDetailCountry } = require('../controllers/getDetailCountry');

const router = Router();

const axios = require('axios');
const { Op } = require('../db');

//Importamos las tablas.
const { Country } = require('../db');
const { Activity } = require('../db');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//*GET ALL

router.get('/countries', async (req, res) => {
  try {
    const countryName = req.query.name;
    //Busca si el query (url) manda un name, ej:
    //? countries?name=lan
    if (!countryName) {
      //Si no manda name, devuelve todos los paises.
      const countries = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(countries);
    } else {
      //* GET - PAISES QUE COINCIDA ?NAME CON EL NOMBRE (SUBTRING)

      //Si sí hay params.name, ej:
      //? countries?name=lan
      //Busca a los paises cuyo name contenga una parte del name que le estan pasando.
      const country = await Country.findAll({
        where: {
          //Op.substring hace referencia a una parte de texto de algo mas grande.
          name: { [Op.substring]: countryName },
        },
        include: [
          {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(country);
    }

    //Funcional con controller.
    //Esperamos a la respuesta del findAll de Countries.
    // const all = await getAllCountries();
    // return res.status(200).json(all);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

//* GET - DETAIL:ID
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
