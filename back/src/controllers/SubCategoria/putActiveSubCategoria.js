const { Subcategoria, Categoria } = require('../../db');

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

    // Obtener la categoría asociada a la subcategoría
    const categoria = await Categoria.findByPk(subcategoria.categoriaId);

    if (!categoria) {
      // Si no se encuentra la categoría asociada, lanzar un error
      const error = new Error('La categoría asociada a la subcategoría no existe.');
      error.status = 404;
      throw error;
    }

    // Verificar si la categoría está activa
    if (!categoria.activa) {
      const error = new Error('No se puede activar la subcategoría porque la categoría asociada no está activa.');
      error.status = 400;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await subcategoria.update({ activa: true });

    subcategoria.dataValues.id = `subCat-${subcategoria.dataValues.id}`;
    subcategoria.dataValues.categoriaId = `cat-${subcategoria.dataValues.categoriaId}`;

    // Devolver la subcategoría actualizada
    return subcategoria;
  } catch (error) {
    console.error('Error al activar la subcategoría:', error);
    throw error;
  }
};
