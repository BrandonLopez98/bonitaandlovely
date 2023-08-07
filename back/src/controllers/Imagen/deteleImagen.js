const { Imagen } = require('../../db');

module.exports = async (imagenId) => {
  try {
    // Verificar si la imagen con el ID proporcionado existe
    const existingImagen = await Imagen.findByPk(imagenId);

    if (!existingImagen) {
      const error = new Error('La imagen no existe.');
      error.status = 400;
      throw error;
    }

    // Actualizar la propiedad 'active' a false
    const updatedImagen = await existingImagen.update({ activa: false });

    return updatedImagen;
  } catch (error) {
    console.error('Error al cambiar el estado de la imagen:', error);
    throw error;
  }
};
