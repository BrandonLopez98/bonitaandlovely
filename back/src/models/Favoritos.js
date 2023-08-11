const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductoFavorito = sequelize.define('Favoritos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  { tableName: 'favoritos', timestamps: true });

  // Definimos las relaciones con otros modelos utilizando la propiedad associate
  ProductoFavorito.associate = (models) => {
    // Relación con el modelo Cliente
    ProductoFavorito.belongsTo(models.Cliente, {
      foreignKey: {
        allowNull: false,
        name: 'clienteId',
      },
    });

    // Relación con el modelo Producto
    ProductoFavorito.belongsTo(models.Producto, {
      foreignKey: {
        allowNull: false,
        name: 'productoId',
      },
    });
  };

  return ProductoFavorito;
};