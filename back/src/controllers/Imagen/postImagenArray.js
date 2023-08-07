const { Imagen } = require('../../db');

module.exports = async (array) => {
  const imagenes = [];

  async function crearimagen(Url) {
    
    try {
     
      // Verificar si ya existe una imagen con el mismo nombre
      const existingimagen = await Imagen.findOne({
        where: {
          url: Url
        }
      });

      if (existingimagen) {
        // Si ya existe una imagen con el mismo nombre, lanzar un error
        throw new Error(`El nombre de imagen ya existe: ${Url}`);
      }

      // Si no existe una imagen con el mismo nombre, crear la nueva imagen
      const newimagen = await Imagen.create({
        url: Url,
      });

      newimagen.dataValues.id = `img-${newimagen.dataValues.id}`;

      imagenes.push(newimagen);
    } catch (error) {
      console.error('Error al crear la imagen:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(array.map((imagen)=>crearimagen(imagen.Url)));
    return imagenes;
  } catch (error) {
    throw error;
  }
};
