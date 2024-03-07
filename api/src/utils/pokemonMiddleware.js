const Pokemon = require('../models/Pokemon');

const Type  = require('../models/Type');


// Middleware para validar datos de entrada
const validatePokemonData = async (req, res, next) => {
    try {
        let { vida, fuerza, defensa, velocidad, altura, peso, tipos, image } = req.body;
        if (
        isNaN(vida) ||
        isNaN(fuerza) ||
        isNaN(defensa) ||
        isNaN(velocidad) ||
        isNaN(altura) ||
        isNaN(peso)
        ) {
            return res.status(400).json({ error: "Alguno de los argumentos no es un número" });
        }

        const  tiposArray = Array.isArray(tipos) ? tipos.map(Number) : [];
        if (!tiposArray.every(Number.isInteger)) {
            return res.status(400).json({ error: "Los tipos deben ser un array de valores numéricos" });
        }

        // Validar que la propiedad 'image' sea una cadena y no esté vacía
        if (typeof image !== 'string' || !image.trim()) {
            return res.status(400).json({ error: "La propiedad 'image' es requerida y no puede estar vacía." });
        }

        // Verificar que los tipos proporcionados existan en la base de datos
        const existingTypes = await Type.findAll({ where: { id: tiposArray } });
        if (existingTypes.length !== tiposArray.length) {
            return res.status(400).json({ error: 'Uno o más tipos no existen en la base de datos.' });
        }

        next();
    } catch (error) {
        console.error('Error en la validación de datos del Pokémon:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    };

    // Middleware para verificar si el nombre del Pokemon ya existe
    const checkPokemonExistence = async (req, res, next) => {
    try {
        const { name } = req.body;

        const existe = await Pokemon.findOne({ where: { name: name } });
        if (existe) {
            return res.status(409).json({ error: "El Pokémon ya existe" });
        }

        next();
    } catch (error) {
        console.error('Error al verificar la existencia del Pokémon:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};



module.exports = {
    validatePokemonData,
    checkPokemonExistence,
};