const { Inventario } = require('../../db');

module.exports = async (productoId,colorId) => {
  try {
    const inventarios = await Inventario.findAll({
      where: {
        productoId,
        colorId
      },
    });

    inventarios.map(inventario => inventario.dataValues.id = `inv-${inventario.dataValues.id}`)

    return inventarios;
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
