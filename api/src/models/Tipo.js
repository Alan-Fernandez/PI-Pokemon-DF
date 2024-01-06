const { DataTypes, Sequelize } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // Definimos el modelo
const Tipo = sequelize.define('tipo', {
    slot: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,  
    },
});



// Devolvemos el modelo Tipo
return Tipo; 
};
