const { Imagen } = require('../../db');

module.exports = async () => {
  try {
    let Imagenes = await Imagen.findAll();

    Imagenes = Imagenes.map((imagen) => {
      return {
        id: `img-${imagen.id}`,
        url: imagen.url,
        activa: imagen.activa
      };
    });

    return Imagenes;
  } catch (error) {
    console.error('Error al obtener las imagenes:', error.message);
    throw error;
  }
};
