const { Size } = require('../../db');

module.exports = async (sizeId) => {
  try {
    // Buscar el tamaño por su ID
    const size = await Size.findByPk(sizeId);

    if (!size) {
      // Si no se encuentra el tamaño, lanzar un error
      const error = new Error('El tamaño no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await size.update({ activa: true });

    size.dataValues.id = `Tam-${size.dataValues.id}`;
    
    // Devolver el tamaño actualizado
    return size;
  } catch (error) {
    console.error('Error al activar el tamaño:', error);
    throw error;
  }
};
