const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const { info, forName, forId } = require("../utils/pokemonDataAccess.js");

const router = Router();

// Ruta para obtener información de Pokémon
router.get("/", async (req, res) => {
    let { name, by } = req.query;
    let pokemonInfo = [];

    // Si se proporciona un nombre, buscar por nombre
    if (name) {
        name = name.toLowerCase();
        pokemonInfo = await forName(name);
        if (!pokemonInfo.length)
            return res.json({ info: "No se encontró el Pokémon" });
        return res.json(pokemonInfo);
    }

    // Si no se proporciona un nombre, obtener información general
    pokemonInfo = await info(by);
    if (!pokemonInfo.length) return res.json({ info: "No hay más registros" });
    res.json(pokemonInfo);
});

// Ruta para obtener información de un Pokémon por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const pokemonInfo = await forId(id);
    if (!pokemonInfo.id) return res.json({ info: "No se encontró el Pokémon" });
    res.json(pokemonInfo);
});

// Ruta para crear un nuevo Pokémon
router.post("/", async (req, res) => {
    let { name, vida, fuerza, defensa, velocidad, altura, peso, tipos } = req.body;

    // Validar que los valores numéricos sean realmente números
    if (
        isNaN(vida) ||
        isNaN(fuerza) ||
        isNaN(defensa) ||
        isNaN(velocidad) ||
        isNaN(altura) ||
        isNaN(peso)
    )
        return res.json({ info: "Alguno de los argumentos no es un número" });

    // Validar que el nombre sea proporcionado
    if (!name) return res.json({ info: "El nombre es obligatorio" });

    // Verificar si el Pokémon ya existe en la base de datos
    const existe = await Pokemon.findOne({ where: { name: name } });
    if (existe) return res.json({ info: "El Pokémon ya existe" });

    // Crear el nuevo Pokémon en la base de datos
    const pokemon = await Pokemon.create({
        name: name.toLowerCase(),
        vida: Number(vida),
        fuerza: Number(fuerza),
        defensa: Number(defensa),
        velocidad: Number(velocidad),
        altura: Number(altura),
        peso: Number(peso),
    });

    // Asignar tipos al Pokémon
    if (!tipos.length) tipos = [1];
    await pokemon.setTipos(tipos);

    res.json({ info: "Pokémon creado" });
});

module.exports = router;
