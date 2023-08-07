const { Imagen } = require('../../db');

module.exports = async (imagenId) => {
  try {
    // Buscar la imagen por su ID
    const imagen = await Imagen.findByPk(imagenId);

    if (!imagen) {
      // Si no se encuentra la imagen, lanzar un error
      const error = new Error('La imagen no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await imagen.update({ activa: true });

    // Devolver la imagen actualizada
    return imagen;
  } catch (error) {
    console.error('Error al activar la imagen:', error);
    throw error;
  }
};
