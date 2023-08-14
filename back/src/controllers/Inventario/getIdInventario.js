const { Inventario } = require('../../db');

module.exports = async (id) => {
  try {
    const inventarios = await Inventario.findAll({
      where: {
        productoId: id,
      },
    });

    let productoId = id;
    let cantidad = 0;
    let colores = [];


    inventarios.forEach((inventario) => {
      cantidad += inventario.cantidad;
    });

    inventarios.forEach((inventario) => {
      colores.push(inventario.colorId)
    });

    const inventarioResult = {
      productoId: productoId,
      colores: colores,
      cantidad: cantidad,
    };

    return inventarioResult;
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
