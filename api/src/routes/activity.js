const { Router } = require('express');
const { Activity, Country } = require('../db');
const { Op } = require('sequelize');
const router = Router();

//?GET - Activities

router.get('/activities', async (req, res) => {
  const allActivities = await Activity.findAll();
  if (allActivities) {
    return res.status(200).json(allActivities);
  } else {
    return res
      .status(404)
      .json(allActivities.length ? allActivities : 'No hay actividades.');
  }
});

//?POST - Activities (linked to Country)

router.post('/activities', async (req, res) => {
  try {
    //Requerimientos del body.
    const { name, difficulty, duration, season, countries } = req.body;
    //Creamos la actividad si estan todos los requerimientos.
    if (name && difficulty && duration && season && countries) {
      const activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      //Recibimos un array de los ids de los countrys, buscamos el ID en la DB, entramos al objeto Country.
      countries.forEach(async (id) => {
        const country = await Country.findOne({
          where: { id: { [Op.iLike]: `%${id}%` } },
        });
        //Y agregamos la actividad (recien creada) a la relación de country y activity. Por eso se llama addActivity.
        //Crea una nueva fila con los dos ids.
        await country?.addActivity(activity);
      });
      return res.send(activity);
    } else {
      return res.status(404).json('Missing data');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
