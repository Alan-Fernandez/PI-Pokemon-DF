import { ADD, BY_TYPE, FILTER, GET_NAME, GET_POKEMONS, GET_TYPE, ORDER } from './type'
// import process from 'process';
// require('dotenv').config();


export const URL_API_PI_POKEMONS= `http://localhost:3001/pokemons`; 
export const URL_API_PI_TYPES= `http://localhost:3001/types`; 


// const {
//     URL_API_PI_POKEMONS,
//     URL_API_PI_TYPES
// } = process.env;

export const getTypes = () => async (dispatch) => {
  const response = await fetch(URL_API_PI_TYPES);
  console.log(response);
  const data = await response.json();
  console.log(data);
  dispatch({
    type: GET_TYPE,
    payload: data,
  });
};

export const getPokemons = () => async (dispatch) => {
  const response = await fetch(URL_API_PI_POKEMONS);
  const data = await response.json();
  dispatch({
    type: GET_POKEMONS,
    payload: data,
  });
};

export const getByName = (name) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_API_PI_POKEMONS}?name=${name}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el Pokémon por nombre');
    }
    const data = await response.json();
    dispatch({
      type: GET_NAME,
      payload: data,
    });
  } catch (error) {
    console.error('Error en la solicitud de Pokémon por nombre:', error);
    // Puedes disparar una acción para manejar el error en el estado de la aplicación si es necesario.
  }
};

export const filters = (num) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_API_PI_POKEMONS}?by=${num}`);
    if (!response.ok) {
      throw new Error('No se pudo aplicar el filtro');
    }
    const data = await response.json();
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
