const axios = require("axios");
const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db.js");

const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
const AMOUNT_POKEMONS = 40;
const DEFAULT_IMAGE_URL = "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif";



const info = async (by) => {
    try {
        const api = await axios.get(`${URL_API_POKEMON}?limit=${AMOUNT_POKEMONS}`);
        const data = api.data;

        const bd = await Pokemon.findAll({ include: Tipo });
        let base = [...bd, ...data.results];

        if (by === "2") {
            base = [...bd];
        } else if (by === "1") {
            base = [...data.results];
        }

        let pokemonInfo = [];
        for (let i = 0; i < base.length; i++) {
            if (!base[i]) continue;
            if (base[i].url) {
                const pokemon = await axios.get(base[i].url);
                const info = pokemon.data;

                pokemonInfo.push({
                    id: info.id,
                    name: info.name,
                    type: info.types.map((t) => t.type.name),
                    img: info.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    fuerza: info.stats[1].base_stat,
                });
            } else {
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
        console.error('Error al obtener información de Pokémon:', error);
        return [];
    }
};


const forName = async (name) => {
    try {
        const db = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: Tipo,
        });

        if (db) {
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
            const api = await axios.get(`${URL_API_POKEMON}/${name}`);
            const data = api.data;
            const pokemonName = [
                {
                    id: data.id,
                    name: data.name,
                    type: data.types.map((t) => t.type.name),
                    img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                },
            ];
            return pokemonName;
        }
    } catch (error) {
        console.error('Error al obtener información de Pokémon por nombre:', error);
        return [];
    }
};


const forId = async (id) => {
    try {
        const api = await axios.get(`${URL_API_POKEMON}/${id}`);
        const data = api.data;

        const pokemonId = {
            id: data.id,
            name: data.name,
            type: data.types.map((t) => t.type.name),
            img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
            vida: data.stats[0].base_stat,
            fuerza: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };

        return pokemonId;
    } catch (error) {
        // Handle error
    }

    try {
        const db = await Pokemon.findByPk(id, { include: Tipo });
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
        console.error('Error al obtener información de Pokémon por ID:', error);
        return {};
    }
};

module.exports = {
info,
forName,
forId,
};