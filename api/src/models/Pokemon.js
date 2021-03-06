const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: { type: DataTypes.STRING},
    health: { type: DataTypes.INTEGER },
    strength: { type:DataTypes.INTEGER },
    defense: { type: DataTypes.INTEGER },
    speed: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.INTEGER }
  });
};
