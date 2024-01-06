import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats";

// import process from 'process';
// const {
//   URL_API_PI_POKEMONS,
//   // URL_API_PI_TYPES
// } = process.env;

export const URL_API_PI_POKEMONS= `http://localhost:3001/pokemons`; 
// export const URL_API_PI_TYPES= `http://localhost:3001/types`; 


const Pokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState({});


  const addTeam = (obj) => {
    let array = localStorage.getItem("team") ? JSON.parse(localStorage.getItem("team")) : [];
    array.length >= 8 && array.shift();
    array.push(obj);
    localStorage.setItem("team", JSON.stringify(array));
    navigate("/team");
  };

  useEffect(() => {
    detalles();
  }, []);

  const detalles = async () => {
    try {
      const { data } = await axios.get(`${URL_API_PI_POKEMONS}/${id}`);
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>

        <div class={style.pokebola}>
          <p>Capturar</p>
          <button
            onClick={() => {
              addTeam({
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
          {pokemon.type
            ? pokemon.type.map((t) => <h3 className={style[`${t}`]} key={t}>{t}</h3>)
            : null}

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