import React, { useState } from "react";
import Card from "../../components/Cards/Card";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../../utils/filtros";
import style from "./pokedex.module.css";

const IMAG_PNG = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71eaa541-f52d-4507-b180-7edb42e34ebd/dcbx2vj-fd4205c7-04ee-483f-b211-38c045cf69b8.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxZWFhNTQxLWY1MmQtNDUwNy1iMTgwLTdlZGI0MmUzNGViZFwvZGNieDJ2ai1mZDQyMDVjNy0wNGVlLTQ4M2YtYjIxMS0zOGMwNDVjZjY5YjguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MxuwaShCXGuCvBALH75ynbgB04UYYy6lcW7b9lYiCV4'


const Pokedex = () => {

  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = tipos(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);

  const pagination = () => {
    if (!pokemons) {
      return [];
    }

    if (pokemons.length) {
      return pokemons.slice(page, page + 9);
    }

    if (pokemons.info) {
      return pokemons;
    }

    return [];
  };

  const array = pagination();

  const nextPage = () => {
    if (pokemons.length > page + 9) {
      setPage(page + 9);
    }
  };

  const previusPage = () => {
    if (page > 0) {
      setPage(page - 9);
    }
  };

  return (
    <div className={style.container}>
    <div className={style.container_pokedex}>
      <Search />
      <div className="botones">
        <button onClick={previusPage} className="pages">
          &laquo; Previus
        </button>
        <button onClick={nextPage} className="pages">
          Next &raquo;
        </button>
      </div>
      <Card
          array={Array.isArray(array) ? array : []}
          img={IMAG_PNG}
      />
    </div>
    </div>
  );
};

export default Pokedex;