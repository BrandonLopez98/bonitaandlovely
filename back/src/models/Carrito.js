const { DataTypes } = require("sequelize");


module.exports = (Sequelize) => {
  const Carrito = Sequelize.define(
    "Carrito",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      compra: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      
    }
  );
  Carrito.associate = models => {
    Carrito.belongsTo(models.Cliente ,{
      foreignKey: "clienteId"
    })
    Carrito.belongsToMany(models.Producto, {
      through: "ProductosEnCarrito",
      foreignKey: "carritoId"
    })
  }
  return Carrito;
};
