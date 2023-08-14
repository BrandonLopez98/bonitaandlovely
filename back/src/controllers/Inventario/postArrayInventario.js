const { Inventario, Producto, Color } = require('../../db');

module.exports = async (array) => {
  try {
    const inventarios = [];

    async function crearInventario(inventario) {
      const { productoId, colorId, cantidad } = inventario;

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

      // Crear el registro en la tabla de inventario
      const nuevoInventario = await Inventario.create({
        productoId,
        colorId,
        cantidad,
      });

      inventarios.push({
        id: `inv-${nuevoInventario.id}`,
        productoId: `prod-${productoId}`,
        colorId: `color-${colorId}`,
        cantidad: nuevoInventario.cantidad,
      });
    }

    await Promise.all(array.map(crearInventario));

    return inventarios;
  } catch (error) {
    console.error('Error al agregar registros en el inventario:', error.message);
    throw error;
  }
};
