const { Producto, Subcategoria } = require('../../db');

module.exports = async (page, size) => {
  try {
    const productos = await Producto.findAndCountAll({
      limit: size,
      offset: page * size,
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    productos.rows.forEach((producto) => {
      producto.dataValues.id = `prod-${producto.dataValues.id}`;
    });

    return productos;
  } catch (error) {
    console.error('Error al obtener los colores:', error.message);
    throw error;
  }
};
