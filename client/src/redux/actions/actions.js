import axios from 'axios';
import {
  FILTER_COUNTRIES,
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
  GET_TOURIST_ACTIVITIES,
  GET_COUNTRY_DETAIL,
  GET_COUNTRIES_QUERY,
  FILTER_BY_ACTIVITIES,
} from '../action_types/action_types';

//Redux: Son objetos que contienen información (payload) y le dicen que operación ejecutar (type) sobre el Store. Si queremos actualizar, borrar, filtrar o añadir datos.

//Tiene 2 datos, debemos hacer el dispatch:

//type: Descripciones - nombres, de lo queremos hacer. Son "Ordenes - Pedidos" que son tomadas por el reducer para ser ejecutadas.
//payload: Data que pasaremos al Store para actualizar el estado (tambien pueden ser name o continents para filtrar).

export function getCountries() {
  //Tomamos la data de todos los countries de GET_ALL.
  return async function (dispatch) {
    let backend = await axios.get('http://localhost:3001/countries', {});
    return dispatch({
      type: GET_COUNTRIES,
      payload: backend.data,
    });
  };
}

export function getCountriesDetail(id) {
  return async function (dispatch) {
    try {
      //Tomamos la data, segun el id del country, de GET_ID.
      var backend = await axios.get('http://localhost:3001/countries/' + id);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: backend.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default function getCountriesSearch(name) {
  //Tomamos name y pasamos la primera a mayus, luego tomamos la informacion de GET_?NAME
  return async function (dispatch) {
    try {
      var backend = await axios.get(
        'http://localhost:3001/countries?name=' +
          name.charAt(0).toUpperCase() +
          name.slice(1)
      );
      return dispatch({
        type: GET_COUNTRIES_QUERY,
        payload: backend.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getActivities() {
  //Tomamos la data de todos las activities de GET_ALL.
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/activities`)
      .then((info) => {
        return dispatch({
          type: GET_TOURIST_ACTIVITIES,
          payload: info.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function postActivity(payload) {
  //Postemos la informacion con la ayuda de POST, mandamos la payload a la DB.
  return async function (dispatch) {
    const response = await axios.post(
      'http://localhost:3001/activities',
      payload
    );
    console.log(response);
    return response;
  };
}

export function getCountriesByName(name) {
  //Pasamos la "orden" de traer paises por nombre, pasamos el nombre de los paises a buscar.
  return {
    type: GET_COUNTRIES_BY_NAME,
    payload: name,
  };
}

export function filterByContinents(payload) {
  //Pasamos la "orden" de filtrar paises, en el payload enviamos "All" si incluye a todos los contienentes, o el contienente por el que debemos filtrar.
  return {
    type: FILTER_COUNTRIES,
    payload,
  };
}

export function orderByName(payload) {
  //Pasamos la "orden" de ordenar paises alfabeticamente, el payload contiene "asc" para mostrar si el ordenamiento es ascendente o no.
  return {
    type: ORDER_COUNTRIES_ALF,
    payload,
  };
}

export function orderByPop(payload) {
  //Pasamos la "orden" de ordenar paises por population, el payload que enviamos contiene "mayp" si quieremos los paises de menor a menos o si no, al reves.
  return {
    type: ORDER_COUNTRIES_POP,
    payload,
  };
}

export function filterByAct(activity) {
  //Pasamos la "orden" de filtar paises por actividades, el payload que enviamos contiene el nombre de la actividad para filtrar o "Todos" si queremos todos los paises con actividades.
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: activity,
  };
}
