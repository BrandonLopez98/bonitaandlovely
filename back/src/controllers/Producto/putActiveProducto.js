const { Producto } = require('../../db');

module.exports = async (productoId) => {
  try {
    // Buscar la marca por su ID
    const producto = await Producto.findByPk(productoId);

    if (!producto) {
      // Si no se encuentra la marca, lanzar un error
      const error = new Error('El producto no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await producto.update({ activa: true });

    producto.dataValues.id = `prod-${producto.dataValues.id}`;

    // Devolver la marca actualizada
    return producto;
  } catch (error) {
    console.error('Error al activar la marca:', error);
    throw error;
  }
};
