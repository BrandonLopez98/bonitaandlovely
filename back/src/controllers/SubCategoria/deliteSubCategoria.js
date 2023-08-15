const { Subcategoria } = require('../../db');

module.exports = async (subcategoriaId) => {
  try {
    // Buscar la subcategoría por su ID
    const subcategoria = await Subcategoria.findByPk(subcategoriaId);

    if (!subcategoria) {
      // Si no se encuentra la subcategoría, lanzar un error
      const error = new Error('La subcategoría no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a false
    await subcategoria.update({ activa: false });

    subcategoria.dataValues.id = `subCat-${subcategoria.dataValues.id}`;
    subcategoria.dataValues.categoriaId = `cat-${subcategoria.dataValues.categoriaId}`;

    // Devolver la subcategoría actualizada
    return subcategoria;
  } catch (error) {
    console.error('Error al eliminar la subcategoría:', error);
    throw error;
  }
};
