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
  const response = await fetch(
    `${URL_API_PI_POKEMONS}?name=${name}`
  );
  const data = await response.json();
  dispatch({
    type: GET_NAME,
    payload: data,
  });
};

export const filters = (num) => async (dispatch) => {
  const response = await fetch(
    `${URL_API_PI_POKEMONS}?by=${num}`
  );
  const data = await response.json();
  dispatch({
    type: FILTER,
    payload: data,
  });
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
