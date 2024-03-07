import { ADD, BY_TYPE, FILTER, GET_NAME, GET_POKEMONS, GET_TYPE, ORDER } from './type'
import axios from 'axios';
// import process from 'process';
// require('dotenv').config();

export const URL_API_PI_POKEMONS= `http://localhost:3001/pokemons`; 
export const URL_API_PI_TYPES= `http://localhost:3001/types`; 


// const {
//     URL_API_PI_POKEMONS,
//     api
// } = process.env;


export const getTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(URL_API_PI_TYPES);
    console.log(response);
    const data = response.data;
    console.log(data);
    
    dispatch({
      type: GET_TYPE,
      payload: data,
    });
  } catch (error) {
    console.error('Error al obtener tipos de Pokémon:', error);
  }
};

export const getPokemons = () => async (dispatch) => {
  try {
    const {data} = await axios.get(URL_API_PI_POKEMONS);
    dispatch({
      type: GET_POKEMONS,
      payload: data,
    });
    
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
};

export const getByName = (name) => async (dispatch) => {
  try {
    const {data} = await axios.get(`${URL_API_PI_POKEMONS}?name=${name}`);
    dispatch({
      type: GET_NAME,
      payload: data,
    });
  } catch (error) {
   if (error.response) {
      console.error('Error en la solicitud de Pokémon por nombre. Detalles:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor en la solicitud de Pokémon por nombre:', error.request);
    } else {
      console.error('Error en la configuración de la solicitud de Pokémon por nombre:', error.message);
    }
  }
};

export const filters = (num) => async (dispatch) => {
  try {
    const { data } = await fetch(`${URL_API_PI_POKEMONS}?by=${num}`);
    
    dispatch({
      type: FILTER,
      payload: data,
    });
  } catch (error) {
    console.error('Error en la aplicación de filtro:', error);
    // Puedes disparar una acción para manejar el error en el estado de la aplicación si es necesario.
  }
};

export const type = (type) => (dispatch) => {
  dispatch({
    type: BY_TYPE,
    payload: type,
  });
};

export const order = (order) => (dispatch) => {
  dispatch({
    type: ORDER,
    payload: order,
  });
};

export const add = (pokemon) => (dispatch) => {
  dispatch({
    type: ADD,
    payload: pokemon,
  });
};
