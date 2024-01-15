const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idPoke: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fuerza: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defensa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    altura: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    }
  });
};