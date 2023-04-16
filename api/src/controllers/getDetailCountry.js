const { Country } = require('../db');

const getDetailCountry = async (idCountry) => {
  try {
    //Buscamos en la DB el ID (en mayus) que nos paso la route.
    const dbCountry = await Country.findOne({
      where: {
        id: idCountry.toUpperCase(),
      },
    });
    return dbCountry;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getDetailCountry };
