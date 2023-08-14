const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Inventario = sequelize.define('Inventario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { 
    tableName: 'inventario',
    timestamps: false,
    associate: (models) => {
      Inventario.belongsTo(models.Producto, {
        foreignKey: 'productoId',
      });

      Inventario.belongsTo(models.Color, {
        foreignKey: 'colorId',
      });
    },
  });

  return Inventario;
};
