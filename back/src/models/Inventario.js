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
        onDelete: 'CASCADE', // Opcional: Define la acción a tomar en cascada al eliminar un producto
      });

      Inventario.belongsTo(models.Color, {
        foreignKey: 'colorId',
        onDelete: 'CASCADE', // Opcional: Define la acción a tomar en cascada al eliminar un color
      });
    },
  });

  return Inventario;
};
