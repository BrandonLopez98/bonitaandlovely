const { Carrito, Cliente, Inventario } = require('../../db');

module.exports = async (clienteId, productos) => {
  try {
    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findByPk(clienteId);
    if (!clienteExistente) {
      throw new Error(`El cliente con ID ${clienteId} no existe.`);
    }

    // Buscar el carrito del cliente
    const carritoExistente = await Carrito.findOne({
      where: {
        clienteId,
        pagado: false,
      },
    });

    if (!carritoExistente) {
      throw new Error(`No se encontró un carrito activo para el cliente con ID ${clienteId}.`);
    }

    // Verificar y actualizar el carrito con inventario y cantidad disponibles
    const carritoProductos = carritoExistente.productos || [];

    for (const producto of productos) {
      const { inventarioId, cantidad, productoId, colorId } = producto;

      let inventarioExistente;

      // Verificar si el inventario existe
      if (inventarioId) {
        inventarioExistente = await Inventario.findByPk(inventarioId);
        if (!inventarioExistente) {
          throw new Error(`El inventario con ID ${inventarioId} no existe.`);
        }
      }

      if (productoId && colorId) {
        inventarioExistente = await Inventario.findOne({
          where: {
            productoId,
            colorId,
          },
        });
        if (!inventarioExistente) {
          throw new Error(`El inventario con producto ${productoId} y color ${colorId} no existe.`);
        }
      }

      // Verificar si la cantidad solicitada es válida
      if (cantidad <= 0 || cantidad > inventarioExistente.cantidad) {
        throw new Error(`La cantidad para el inventario con ID ${inventarioExistente.id} no es válida.`);
      }

      carritoProductos.push({
        inventarioId: inventarioExistente.id,
        productoId: inventarioExistente.productoId,
        colorId: inventarioExistente.colorId,
        cantidad,
      });
    }

    // Actualizar el carrito en la base de datos con los nuevos productos
    carritoExistente.productos = carritoExistente.productos.concat(carritoProductos);

    await carritoExistente.save();

    return carritoExistente;
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error.message);
    throw error;
  }
};
