const { Inventario } = require('../../db');

module.exports = async (productoId, colorId, cantidad) => {
  try {
    // Verificar si existe el inventario para el producto y color específicos
    const inventario = await Inventario.findOne({
      where: {
        productoId,
        colorId,
      },
    });

    if (!inventario) {
      throw new Error(`No se encontró inventario para el producto ${productoId} y color ${colorId}.`);
    }

    // Verificar si la cantidad a restar es válida
    if (cantidad < 0) {
      throw new Error('La cantidad debe ser mayor que cero.');
    }

    // Verificar si hay suficiente cantidad en el inventario
    if (inventario.cantidad < cantidad) {
      throw new Error('No hay suficiente cantidad en el inventario.');
    }

    // Restar la cantidad del inventario
    const nuevaCantidad = inventario.cantidad - cantidad;

    // Actualizar el inventario con la nueva cantidad
    await Inventario.update(
      { cantidad: nuevaCantidad },
      {
        where: {
          productoId,
          colorId,
        },
      }
    );

    const respuesta = {
      productoId: productoId,
      colorId: colorId,
      cantidadRestante: nuevaCantidad,
    };

    return respuesta;
  } catch (error) {
    console.error('Error de la venta en inventario:', error.message);
    throw error;
  }
};
