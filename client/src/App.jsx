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
        <Route path="/pokedex/:id" element={<Pokemon />}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Pokedex/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/team" element={<Team/>}/>
      </Routes>
    </div>
  );
}

export default App;
