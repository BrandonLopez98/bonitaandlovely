const { Imagen } = require('../../db');

module.exports = async (url) => {
 
  try {
   
    // Verificar si ya existe una Imagen con el mismo nombre
    const existingImagen = await Imagen.findOne({
      where: {
        url: url
      }
    });

    if (existingImagen) {
      // Si ya existe una Imagen con el mismo nombre, lanzar un error
      throw new Error(`El nombre de Imagen ya existe: ${url}`);
    }

    // Si no existe una Imagen con el mismo nombre, crear la nueva Imagen
    const newImagen = await Imagen.create({
      url,
    });

    newImagen.dataValues.id = `img-${newImagen.dataValues.id}`

    return newImagen;
  } catch (error) {
    console.error('Error al crear la Imagen:', error.message);
    throw error;
  }
};
