// Importación de módulos necesarios
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Obteniendo credenciales de la base de datos desde variables de entorno
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Creación de una instancia de Sequelize para la conexión a la base de datos PostgreSQL
const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false, // Desactiva los mensajes de registro en la consola
      native: false,  // Desactiva el uso de la extensión nativa de PostgreSQL
   }
);

// Autenticación con la base de datos
sequelize.authenticate()
   .then(() => console.log('Connection has been established successfully.'))
   .catch(err => { console.error('Unable to connect to the database:', err); });

// Obtiene el nombre base de los archivos de modelos en este directorio
const basename = path.basename(__filename);

// Array para almacenar las definiciones de modelos
const modelDefiners = [];

// Lee los archivos de modelos en el directorio "models"
fs.readdirSync(path.join(__dirname, "/models"))
.filter(
   (file) =>
   file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
)
.forEach((file) => {
   // Requiere y almacena las definiciones de modelos en el array
   modelDefiners.push(require(path.join(__dirname, "/models", file)));
});

// Crea los modelos en la instancia Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Transforma los nombres de modelos para que comiencen con mayúscula
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtiene los modelos creados
const { Pokemon,  Types} = sequelize.models;

// Define una relación de muchos a muchos entre Pokemon y Tipo a través de la tabla intermedia "TipoPokemon"
Pokemon.belongsToMany(Types, { through: "TypesPokemon" });
Types.belongsToMany(Pokemon, { through: "TypesPokemon" });

// Exporta los modelos y la instancia de Sequelize para su uso en otras partes de la aplicación
module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
