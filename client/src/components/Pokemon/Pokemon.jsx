import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats";

export const URL_API_PI_POKEMONS = `http://localhost:3001/pokemons`;


const Pokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState({
    name: "",
    id: "",
    img: "",
    type: [],
    weight: "",
    height: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
  });


  const addTeam = (obj) => {
    const array = localStorage.getItem("team")
      ? JSON.parse(localStorage.getItem("team"))
      : [];
  
    if (array.length >= 8) array.shift();
    array.push(obj);
    localStorage.setItem("team", JSON.stringify(array));
    navigate("/team");
  };

  useEffect(() => {
    detalles();
  },[]);

  const detalles = async () => {
    try {
      const response = await axios.get(`${URL_API_PI_POKEMONS}/${id}`);
      const pokemon = response.data;

      // Verificar si la respuesta tiene la estructura esperada
      if (!pokemon || typeof pokemon !== 'object') {
        console.error('La respuesta del servidor no tiene el formato esperado.');
        return;
      }

      // Verificar si hay datos del tipo de Pokemon
      if (!pokemon.type || !Array.isArray(pokemon.type)) {
        console.error('La respuesta del servidor no contiene información sobre el tipo del Pokémon.');
        return;
      }

      // Actualizar el estado con los datos del Pokémon
      setPokemon(pokemon);
      console.log('Respuesta del servidor:', pokemon);

    } catch (error) {
      // Manejo de errores específicos
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('Error en la respuesta del servidor:', error.response.status, error.response.data);
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta
        console.error('Error sin respuesta del servidor:', error.request);
      } else {
        // Otros errores
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1>{pokemon.name}</h1>
        <h2>{pokemon.id}</h2>

        <div className={style.pokebola}>
          <p>Capturar</p>
          <button
            onClick={() => {
              addTeam({
                key: pokemon.id,
                id: pokemon.id,
                name: pokemon.name,
                type: pokemon.type,
                img: pokemon.img,
              });
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
              alt=""
            />
          </button>
        </div>

        <div className={style.ima}>
          <img src={pokemon.img} alt="" />
          <div className={style.parrafo}>
            <p>peso: {pokemon.weight}kg</p>
            <p>altura: {pokemon.height}ft</p>
          </div>
        </div>

        <div className={style.type}>
          {pokemon.type && Array.isArray(pokemon.type) && pokemon.type.length > 0 ? (
            pokemon.type.map((t) => (
              <h3 key={t}  className={style[`${t}`]}>
                {t}
              </h3>
            ))
          ) : <p>No se ha definido el tipo.</p>}
        </div>

        <div className={style.meter}>
          <div className={style.type}>
            <Stats valor={pokemon.vida} nombre={"HP"} />
            <Stats valor={pokemon.fuerza} nombre={"Fuerza"} />
          </div>
          <div className={style.type}>
            <Stats valor={pokemon.defensa} nombre={"Defensa"} />
            <Stats valor={pokemon.velocidad} nombre={"Velocidad"} />
          </div>
        </div>
      </div>
    </>
  );
};


export default Pokemon;