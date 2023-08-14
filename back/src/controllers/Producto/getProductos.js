const { Producto, Subcategoria } = require('../../db');

module.exports = async () => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    productos.forEach(producto => {
      producto.dataValues.id = `prod-${producto.dataValues.id}`;
    });
    
    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
