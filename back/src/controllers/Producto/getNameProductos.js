const { Producto, Subcategoria } = require('../../db');
const { Sequelize } = require('sequelize');

module.exports = async (name) => {
  try {
    const productos = await Producto.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name.toLowerCase()}%`,
        },
      },
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    productos.map(producto => producto.dataValues.id = `prod-${producto.dataValues.id}`)

    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
