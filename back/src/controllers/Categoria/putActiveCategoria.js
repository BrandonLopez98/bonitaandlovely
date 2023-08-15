const { Categoria } = require('../../db');

module.exports = async (categoriaId) => {
  try {
    // Buscar la categoría por su ID
    const categoria = await Categoria.findByPk(categoriaId);

    if (!categoria) {
      // Si no se encuentra la categoría, lanzar un error
      const error = new Error('La categoría no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await categoria.update({ activa: true });

    categoria.dataValues.id = `cat-${categoria.dataValues.id}`

    // Devolver la categoría actualizada
    return categoria;
  } catch (error) {
    console.error('Error al activar la categoría:', error);
    throw error;
  }
};
