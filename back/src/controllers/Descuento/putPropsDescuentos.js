const { Descuento } = require('../../db');

module.exports = async (descuentoId, dataToUpdate) => {
  try {
    // Buscar el descuento por su ID
    const descuento = await Descuento.findByPk(descuentoId);

    if (!descuento) {
      // Si no se encuentra el descuento, lanzar un error
      const error = new Error('El descuento no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar los datos del descuento
    await descuento.update(dataToUpdate);

    descuento.dataValues.id = `desc-${descuento.dataValues.id}`;

    // Devolver el descuento actualizado
    
    return descuento;
  } catch (error) {
    console.error('Error al actualizar el descuento:', error.message);
    throw error;
  }
};