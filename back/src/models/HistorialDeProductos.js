const { DataTypes } = require("sequelize");;

module.exports = (sequelize) => {
  const HistorialDeProductos = sequelize.define(
    "HistorialDeProductos",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      }
    }
  );
  HistorialDeProductos.associate = models =>{
    HistorialDeProductos.belonsTo(models.Cliente, {
      foreignKey: 'clienteId'
    });
    HistorialDeProductos.belonsToMany(models.Producto,{
      through: 'productosEnHistorial'
    })
  }
  return HistorialDeProductos;
};
