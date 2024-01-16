const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { info, forName, forId } = require("../utils/pokemonDataAccess.js");
const { validatePokemonData, checkPokemonExistence } = require("../utils/pokemonMiddleware.js");

const router = Router();



// Ruta GET para obtener todos los Pokémon o filtrar por nombre o tipo
router.get("/", async (req, res) => {
  try {
    let { name, by } = req.query;
    let pokemonInfo = [];

    // Filtrar por nombre si se proporciona 'name'
    if (name) {
      name = name.toLowerCase();
      pokemonInfo = await forName(name);
      if (!pokemonInfo.length) return res.status(404).json({ info: "No se encontró el Pokémon" });
      return res.json(pokemonInfo);
    }
    
    if (by && !['vida', 'fuerza', 'defensa', 'velocidad', 'altura', 'peso'].includes(by)) {
      return res.status(400).json({ error: "El parámetro 'by' es inválido" });
    }

    // Obtener información general si se proporciona 'by'
    pokemonInfo = await info(by);
    if (!pokemonInfo.length) return res.status(404).json({ info: "No hay más registros" });

    // Enviar respuesta con la información obtenida
    res.json(pokemonInfo);
  } catch (error) {
    console.error('Error en la ruta GET /pokemons:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta GET para obtener información de un Pokémon por su ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$|^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(id)) {
      console.error("ID inválido:", id);
      return res.status(400).json({ error: "El ID no es válido" });
    }
    const pokemonInfo = await forId(id);
    
    if (!pokemonInfo.id) {
      console.warn(`No se encontró el Pokémon con ID: ${id}`);
      return res.status(404).json({ info: "No se encontró el Pokémon" });
    }

    console.log(`Información del Pokémon con ID ${id}:`, pokemonInfo);
    res.json(pokemonInfo);
    
  } catch (error) {
    console.error("Error en la obtención de información del Pokémon:", error);
    res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
  }
});

// Ruta POST para crear un nuevo Pokémon
router.post("/", validatePokemonData, checkPokemonExistence, async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { name, vida, fuerza, defensa, velocidad, altura, peso, tipos, image } = req.body;

    // Convertir tipos a un array de números
    let tiposArray = Array.isArray(tipos) ? tipos.map(Number) : [];

    // Verificar que los tipos proporcionados existan en la base de datos
    const existingTypes = await Type.findAll({ where: { id: tiposArray } });
    if (existingTypes.length !== tiposArray.length) {
      return res.status(400).json({ error: 'Uno o más tipos no existen en la base de datos.' });
    }

    // Crear un nuevo Pokémon en la base de datos
    const pokemon = await Pokemon.create({
      name: name.toLowerCase(),
      vida: Number(vida),
      fuerza: Number(fuerza),
      defensa: Number(defensa),
      velocidad: Number(velocidad),
      altura: Number(altura),
      peso: Number(peso),
      image: String(image),
    });

    // Asignar los tipos al Pokémon
    await pokemon.setTypes(tiposArray);

    // Enviar respuesta con la información del Pokémon creado
    res.status(201).json({ info: "Pokémon creado exitosamente" });
  } catch (error) {
    console.error('Error en la ruta POST /pokemons:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exportar el router para su uso en la aplicación principal
module.exports = router;
