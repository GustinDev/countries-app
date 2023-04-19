const axios = require('axios');

//Tomamos el Modelos de Models.
const { Country } = require('../db');

//Traemos todos los datos de la API.

const getApiData = async () => {
  //Traemos la data del link con axios, (el await es porque es una promesa).
  let response = await axios('https://restcountries.com/v3/all');

  //Mapeamos a response.data (porque axios lo guarda ahí).
  const countries = response.data.map((country) => {
    //Cada item se mapea y se guarda en uno nuevo, con lo que le especifiquemos.
    //Guardamos la info en un objeto igual al modelo, pero sacamos la info segun el API.
    const countryItem = {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      continent: country.continents[0],
      capital:
        country.capital != null ? country.capital[0] : 'No hay información',
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
    //Retornamos el objeto.
    return countryItem;
  });
  //Retornamos el array de objetos que mapeamos.
  return countries;
};

//Guarda la info del getApiData en la DB.

const saveApiData = async () => {
  try {
    //Creamos una var donde se muestre si ya hay countries inyectados en la DB (si no, crashea por el force:false).
    const areCountries = await Country.findAll();
    //Si no, los inyecta.
    if (!areCountries.length) {
      //Guarda la info de getApiData en el array.
      const array = await getApiData();
      //Country Hace referencia a la tabla. Le pasa la data a la table y la crea.
      await Country.bulkCreate(array);
    }
  } catch (error) {
    console.log(error);
  }
};

//Ejecuta a saveApiData y pide que la esperemos.
const loadCountries = async () => {
  await saveApiData();
};
loadCountries();

module.exports = {
  saveApiData,
};

//Guardamos los datos en la DB.
