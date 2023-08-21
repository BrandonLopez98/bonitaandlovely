const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  const Marca = sequelize.define('Marca', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: 'marca',timestamps: false }
  );
  return Marca
};
