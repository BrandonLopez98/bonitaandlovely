const { Inventario } = require('../../db');

module.exports = async (productoId,colorId) => {
  try {
    const inventarios = await Inventario.findAll({
      where: {
        productoId,
        colorId
      },
    });

    return inventarios;
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
