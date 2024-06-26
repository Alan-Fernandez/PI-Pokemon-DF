const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db.js");

const URL_API_POKEMON_TYPES = 'https://pokeapi.co/api/v2/type';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get(`${URL_API_POKEMON_TYPES}`);
        const types = await data.results;

        const newTypes = [];
        
        for (const t of types) {
            const [tipo, created] = await Type.findOrCreate({
                where: { name: t.name },
                defaults: { name: t.name }
            });

            if (created) {
                newTypes.push(tipo);
            }
        }

        res.json(newTypes);
        
    } catch (error) {
        console.error(`Error al obtener tipos de Pokémon desde ${URL_API_POKEMON_TYPES}:`, error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
