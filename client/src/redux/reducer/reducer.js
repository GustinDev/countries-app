//Importamos Actions.
import {
  FILTER_COUNTRIES,
  FILTER_BY_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_TOURIST_ACTIVITIES,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
  GET_COUNTRY_DETAIL,
  ADD_TOURIST_ACTIVITIES,
  GET_COUNTRIES_QUERY,
} from '../action_types/action_types';

//Declaramos estados globales iniciales.
const initialState = {
  countries: [],
  allCountries: [],
  allActivities: [],
  activities: [],
  detail: {},
};

//Aqui se define el estado inicial y se actuliza el estado global. Se esperan dos parámetros:

//State: Que información tiene y lo que vamos a actualizar.
//Action: Contiene un type (que nos dice que vamos a ejecutar) y un payload con la información para actualizar el estado.

//Los reducer basados en el action (type y paylaod), ejectan codigo que actualiza el estado global y se lo envia al store (como un nuevo objeto).

//El payload tambien pueden ser name o continents para filtrar.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //Actulizamos los estados llamando a los actions:
    case GET_COUNTRIES:
      return {
        //Guarda en countries y allCountries toda la info de /countries.
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_COUNTRY_DETAIL:
      //Guarda en detail toda la info de /countries/id.
      return {
        ...state,
        detail: action.payload,
      };
    case GET_COUNTRIES_QUERY:
      //Guarda - actualiza en countries toda la info /countries?name= .
      return {
        ...state,
        countries: action.payload,
      };
    case GET_TOURIST_ACTIVITIES:
      //Guarda en activities toda la info de /activities.
      return {
        ...state,
        allActivities: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      console.log(action.payload);
      //En countriesFiltered guardamos el resultado del filtrado.
      let countriesFiltered =
        action.payload === ''
          ? //Si nombre (action.payload) esta vacia retorna allCountries.
            state.allCountries
          : //Si no esta vacia, filtra countries y deja todos cuyo nombre incluya action.payload (minusculas)
            state.countries.filter((e) =>
              e.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      console.log(action.payload);
      //Devuelve countries con los nuevosPaises dentro.
      return {
        ...state,
        countries: countriesFiltered,
      };

    case FILTER_COUNTRIES:
      //Guarda en una variable todos los paises, recibimos de action una variable sobre el continente..
      const allCountries = state.allCountries;
      //En contienentFiltered se guarda el resultado del filtrado.
      const continentFiltered =
        action.payload === 'All'
          ? //Si continentFiltered (action.payload) tiene un payload de All, se le asigna el valor de allCountries (todos).
            allCountries
          : //Si no, se filtra allCountries, donde el contienente sea igual a action.payload.
            allCountries.filter((e) => e.continent === action.payload);
      return {
        //Devuelve countries con los nuevosPaises dentro.
        ...state,
        countries: continentFiltered,
      };

    case ORDER_COUNTRIES_ALF:
      //Aqui se guardan los paises ordenados.
      let sortedArr =
        //Si action.asc se ordenan los paises de forma ascendente.
        action.payload === 'asc'
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : //Si action no es asc se ordenan los paises de forma descendente.
            state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        //Devuelve countries con los paises ordenados dentro.
        countries: sortedArr,
      };
    case ORDER_COUNTRIES_POP:
      //Aqui se guardan los paises ordenados segun su poblacion.
      let sortedArrPop =
        action.payload === 'mayp'
          ? //Si el payload es mayp se organiza de mayor a menor.
            state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : //Si el payload no es mayp se organiza de menor a mayor.
            state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        //Devuelve countries con los paises ordenados dentro.
        countries: sortedArrPop,
      };

    case ADD_TOURIST_ACTIVITIES:
      //Devuelve el estado igual.
      return {
        ...state,
      };

    case FILTER_BY_ACTIVITIES:
      //Aqui se guardan todos los paises.
      const allCountriesStanding = state.allCountries;

      //Aqui se guardan los countries que si tienen actividiades.
      const countriesAct = allCountriesStanding.filter((pais) => {
        return pais.Activities.length > 0;
      });

      //Llenamos en el array todos los paises con actividades que sean iguales a la actividad dada por el action.payload.
      let arrayCountriesFilter = [];
      for (let i = 0; i < countriesAct.length; i++) {
        for (let j = 0; j < countriesAct[i].Activities.length; j++) {
          if (countriesAct[i].Activities[j].name === action.payload) {
            arrayCountriesFilter.push(countriesAct[i]);
          }
        }
      }

      //Si el payload es Todos, devolvemos todos los countries (allCountriesStanding). Si no, el array que creamos con los paises filtrados (arrayCountriesFilter).
      const filtered =
        action.payload === 'Todos'
          ? allCountriesStanding
          : arrayCountriesFilter;

      return {
        ...state,
        countries: filtered,
      };

    default:
      return state;
  }
}

export default rootReducer;
