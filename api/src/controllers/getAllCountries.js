const { Country } = require('../db');

//Find all es de SQLZ, trae todos los objetos que encuentre.

const getAllCountries = async () => {
  try {
    //Le pedimos que busque a todos los objetos de la tabla Country y los guarde en una var, la cual retornamos.
    const allCountries = await Country.findAll();
    return allCountries;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getAllCountries };
