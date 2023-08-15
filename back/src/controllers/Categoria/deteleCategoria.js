const { Categoria, Subcategoria } = require('../../db');

module.exports = async (categoriaId) => {
  try {
    // Verificar si la categoría con el ID proporcionado existe
    const existingCategoria = await Categoria.findByPk(categoriaId);

    if (!existingCategoria) {
      const error = new Error('La categoría no existe.');
      error.status = 400;
      throw error;
    }

    // Verificar si hay subcategorías activas vinculadas a esta categoría
    const activeSubcategorias = await Subcategoria.findAll({
      where: {
        categoriaId,
        activa: true,
      },
    });

    if (activeSubcategorias.length > 0) {
      const error = new Error('No se puede cambiar el estado de la categoría mientras haya subcategorías activas.');
      error.status = 400;
      throw error;
    }

    // Actualizar la propiedad 'active' a false
    const updatedCategoria = await existingCategoria.update({ activa: false });

    updatedCategoria.dataValues.id = `cat-${updatedCategoria.dataValues.id}`

    return updatedCategoria;
  } catch (error) {
    console.error('Error al cambiar el estado de la categoría:', error);
    throw error;
  }
};
