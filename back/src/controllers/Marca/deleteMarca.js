const { Marca } = require('../../db');

module.exports = async (marcaId) => {
  try {
    // Buscar la marca por su ID
    const marca = await Marca.findByPk(marcaId);

    if (!marca) {
      // Si no se encuentra la marca, lanzar un error
      const error = new Error('La marca no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a false
    await marca.update({ activa: false });

    marca.dataValues.id = `mar-${marca.dataValues.id}`

    // Devolver la marca actualizada
    return marca;
  } catch (error) {
    console.error('Error al desactivar la marca:', error);
    throw error;
  }
};
