const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { info, forName, forId } = require("../utils/pokemonDataAccess.js");

const router = Router();

router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];
  if (name) {
    name = name.toLowerCase();
    pokemonInfo = await forName(name);
    if (!pokemonInfo.length) return res.json({ info: "No se encontró el pokemon" });
    return res.json(pokemonInfo);
  }

  pokemonInfo = await info(by);
  if (!pokemonInfo.length) return res.json({ info: "No hay más registros" });

  res.json(pokemonInfo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonInfo = await forId(id);
  if (!pokemonInfo.id) return res.json({ info: "No se encontró el pokemon" });
  res.json(pokemonInfo);
});

router.post("/", async (req, res) => {
  let { name, vida, fuerza, defensa, velocidad, altura, peso, tipos } = req.body;
  if (
    isNaN(vida) ||
    isNaN(fuerza) ||
    isNaN(defensa) ||
    isNaN(velocidad) ||
    isNaN(altura) ||
    isNaN(peso)
  )
    return res.json({ info: "Alguno de los argumentos no es un número" });

  if (!name) return res.json({ info: "El nombre es obligatorio" });

  const existe = await Pokemon.findOne({ where: { name: name } });
  if (existe) return res.json({ info: "El pokemon ya existe" });

  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    vida: Number(vida),
    fuerza: Number(fuerza),
    defensa: Number(defensa),
    velocidad: Number(velocidad),
    altura: Number(altura),
    peso: Number(peso),
  });

  if (!tipos.length) tipos = [1];

  await pokemon.setTypes(tipos); // Aquí ajusté el método a setTypes
  res.json({ info: "Pokemon creado" });
});

module.exports = router;
