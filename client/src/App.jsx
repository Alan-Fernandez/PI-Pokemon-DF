import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getTypes } from "./redux/actions/index";
import Pokemon from "./components/Pokemon/Pokemon";
import  Navbar  from "./components/Navbar/Navbar";
import  Create  from "./Pages/Create/Create";
import  Pokedex  from "./Pages/Pokedex/Pokedex";
import  LandingPage  from "./Pages/LandingPage";
import Team from "./Pages/Team/Team";

import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/pokedex/:id" element={<Pokemon />}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Pokedex/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/team" element={<Team/>}/>
      </Routes>
    </>
  );
}

export default App;
