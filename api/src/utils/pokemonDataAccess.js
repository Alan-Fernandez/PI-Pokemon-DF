const axios = require("axios");
const { Pokemon, Types } = require("../db.js");

const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
const URL_API_POKEMON_TYPES = 'https://pokeapi.co/api/v2/type';
const AMOUNT_POKEMONS = 40;

const info = async (by) => {
    try {
        // Obtener datos de la API y de la base de datos
        const { data } = await axios.get(`${URL_API_POKEMON}?limit=${AMOUNT_POKEMONS}`);

        const bd = await Pokemon.findAll({ include: Types });

        // Combinar datos de la API y de la base de datos
        let base = [...bd, ...data.results];

        // Filtrar según la opción proporcionada
        if (by === "2") {
            base = [...bd];
        } else if (by === "1") {
            base = [...data.results];
        }

        // Procesar la información de cada Pokémon
        let pokemonInfo = [];
        for (let i = 0; i < base.length; i++) {
            if (!base[i]) return pokemonInfo;
            if (base[i].url) {
                // Obtener detalles del Pokémon desde la URL de la API
                const {data} = await axios.get(base[i].url);
                const {id, name, types, sprites, stats} = data;

                // Construir objeto con información relevante
                pokemonInfo.push({
                    id: id,
                    name: name,
                    type: types.map((t) => t.type.name),
                    img: sprites.versions["generation-v"]["black-white"].animated.front_default,
                    fuerza: stats[1].base_stat,
                });
            } else {
                // Construir objeto con información relevante de la base de datos
                pokemonInfo.push({
                    id: base[i].id,
                    idPoke: base[i].idPoke,
                    name: base[i].name,
                    type: base[i].tipos.map((t) => t.name),
                    fuerza: base[i].fuerza,
                    img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
                });
            }
        }
        return pokemonInfo;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const forName = async (name) => {
    try {
        // Buscar en la base de datos
        const db = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: Types,
        });

        if (db) {
            // Construir objeto con información relevante de la base de datos
            const pokemonDb = [
                {
                    id: db.id,
                    idPoke: db.idPoke,
                    name: db.name,
                    type: db.tipos.map((t) => t.name),
                    img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
                },
            ];
            return pokemonDb;
        } else {
            // Si no se encuentra en la base de datos, buscar en la API
            const {data} = await axios.get(`${URL_API_POKEMON}/${name}`);
            const {id, name, types, sprites} = data

            // Construir objeto con información relevante de la API
            const pokemonName = [
                {
                    id: id,
                    name: name,
                    type: types.map((t) => t.type.name),
                    img: sprites.versions["generation-v"]["black-white"].animated.front_default,
                },
            ];
            return pokemonName;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

const forId = async (id) => {
    try {
        // Buscar en la API por ID
        const { data } = await axios.get(`${URL_API_POKEMON}/${id}`);
        const {id, name, types, sprites, stats, height, weight} = data

        // Construir objeto con información relevante de la API
        const pokemonId = {
            id: id,
            name: name,
            type: types.map((t) => t.type.name),
            img: sprites.versions["generation-v"]["black-white"].animated.front_default,
            vida: stats[0].base_stat,
            fuerza: stats[1].base_stat,
            defensa: stats[2].base_stat,
            velocidad: stats[5].base_stat,
            height: height,
            weight: weight,
        };

        return pokemonId;
    } catch (error) {
        // Si no se encuentra en la API, intentar buscar en la base de datos por ID
        try {
            const db = await Pokemon.findByPk(id, { include: Tipo });
            // Construir objeto con información relevante de la base de datos
            const pokemonDb = {
                id: db.idPoke,
                name: db.name,
                type: db.tipos.map((t) => t.name),
                img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
                vida: db.vida,
                fuerza: db.fuerza,
                defensa: db.defensa,
                velocidad: db.velocidad,
                height: db.altura,
                weight: db.peso,
            };

            return pokemonDb;
        } catch (error) {
            return {};
        }
    }
};

module.exports = {
    info,
    forName,
    forId,
};
