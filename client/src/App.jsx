import Pokemon from "./components/Pokemon/Pokemon";
import  Navbar  from "./components/Navbar/Navbar";
import  Create  from "./Pages/Create/Create";
import  Pokedex  from "./Pages/Pokedex/Pokedex";
import  LandingPage  from "./Pages/LandingPage";
import Team from "./Pages/Team/Team";

import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/pokedex/:id" element={<Pokemon />}/>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Pokedex/>}/>
        <Route exact path="/create" element={<Create/>}/>
        <Route exact path="/team" element={<Team/>}/>
      </Routes>
    </div>
  );
}

export default App;
