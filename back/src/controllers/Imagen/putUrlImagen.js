const { Imagen } = require('../../db');

module.exports = async (imagenId, newUrl) => {
  
  try {
    // Verificar si la Imagen con el imagenId existe
    const existingImagen = await Imagen.findOne({
      where: {
        id: imagenId
      }
    });

    if (!existingImagen) {
      // Si la imagen no existe, lanzar un error
      const error = new Error('La Imagen no existe.');
      error.status = 400;
      throw error;
    }

    // Verificar si ya existe una imagen con la misma url
    const existingImagenWithName = await Imagen.findOne({
      where: {
        url: newUrl
      }
    });

    if (existingImagenWithName) {
      // Si ya existe una imagen con el mismo nombre, lanzar un error
      const error = new Error(`El nombre de imagen ya existe: ${newUrl}`);
      error.status = 400;
      throw error;
    }

    // Actualizar el nombre de la imagen
    existingImagen.url = newUrl;
    await existingImagen.save();

    existingImagen.dataValues.id = `img-${existingImagen.dataValues.id}`;

    return existingImagen;
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    throw error;
  }
};
