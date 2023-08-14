const { Inventario, Producto, Color } = require('../../db');

module.exports = async ({productoId, colorId, cantidad}) => {
  try {
    // Verificar si el producto existe
    const productoExistente = await Producto.findByPk(productoId);
    if (!productoExistente) {
      throw new Error(`El producto con ID ${productoId} no existe.`);
    }

    // Verificar si el color existe
    const colorExistente = await Color.findByPk(colorId);
    if (!colorExistente) {
      throw new Error(`El color con ID ${colorId} no existe.`);
    }

    const Inventario = await Inventario.findOne({
      productoId,
      colorId,
    });
    if (Inventario) {
      throw new Error(`El producto ${productoId} con el color ${colorId} ya fue creado`);
    }

    // Crear el registro en la tabla de inventario
    const nuevoInventario = await Inventario.create({
      productoId,
      colorId,
      cantidad,
    });

    // Formatear la respuesta
    const respuesta = {
      id: `inv-${nuevoInventario.id}`,
      productoId: `prod-${productoId}`,
      colorId: `color-${colorId}`,
      cantidad: nuevoInventario.cantidad,
    };

    return respuesta;
  } catch (error) {
    console.error('Error al agregar registro en el inventario:', error.message);
    throw error;
  }
};
