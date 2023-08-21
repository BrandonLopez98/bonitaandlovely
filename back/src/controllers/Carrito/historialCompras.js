const { Carrito, Producto, Color, Cliente } = require('../../db');

module.exports = async (clienteId) => {
  try {
    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/);
    
      if (match) {
        return parseInt(match[0]);
      }
    
      return null;
    }
    clienteId = extractNumberFromString(clienteId);
    
    const carritoExistente = await Carrito.findAll({
      where: {
        clienteId,
        pagado: true,
      },
    });

    if (!carritoExistente.length) {
       return(`No existe un historial para el cliente con ID ${clienteId}.`);
    }

    const clienteDetalles = await Cliente.findByPk(clienteId, {
      attributes: ['name'],
    });

    const productos = [];

    for (const carrito of carritoExistente) {
      for (const producto of carrito.dataValues.productos) {
        const productoDetalles = await Producto.findByPk(producto.productoId, {
          attributes: ['name', 'precio_venta'],
        });
        const colorDetalles = await Color.findByPk(producto.colorId, {
          attributes: ['name'],
        });

        if (productoDetalles) {
          productos.push({
            colorId: producto.colorId,
            colorName: colorDetalles.name,
            cantidad: producto.cantidad,
            productoId: producto.productoId,
            productoName: productoDetalles.name,
            productoPrecio: productoDetalles.precio_venta,
            inventarioId: producto.inventarioId,
            fechaCompra: carrito.dataValues.fechaCompra,
          });
        }
      }
    }

    let historial = {
      clienteId: clienteId,
      clienteName: clienteDetalles.name,
      productos: productos
    }


    return historial;
  } catch (error) {
    console.error('Error al ver registro en el carrito:', error.message);
    throw error;
  }
};
