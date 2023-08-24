const { Producto, Subcategoria, Inventario, Marca, Categoria, Op } = require('../../db');
const { Sequelize } = require('sequelize');

module.exports = async (page, size, filters,  name) => {
  try {
    const { marcaId, categoriaId, precioMin, precioMax } = filters;

    const productosQuery = {
      limit: size,
      offset: page * size,
      include: [
        {
          model: Subcategoria,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
      where: {},
    };

    if (marcaId) {
      productosQuery.where.marcaId = marcaId;
    }

    if (categoriaId) {
      productosQuery.where.categoriaId = categoriaId;
    }

    if (precioMin && precioMax) {
      productosQuery.where.precio_venta = {
        [Op.between]: [precioMin, precioMax],
      };
    }

    if (name) {
      productosQuery.where.name = {
        [Sequelize.Op.like]  : `%${name.toLowerCase()}%`,
      };
    }

    const productos = await Producto.findAndCountAll(productosQuery);

    for (const producto of productos.rows) {
      const inventarios = await Inventario.findAll({
        where: {
          productoId: producto.dataValues.id,
        },
      });
      let cantidad = 0;
      inventarios.forEach((inventario) => {
        cantidad += inventario.cantidad;
      });
      producto.dataValues.cantidad = cantidad;
      producto.dataValues.id = `prod-${producto.dataValues.id}`;
    }

    let cantidadproductos = await Producto.findAll()
    productos.count = cantidadproductos.length
    
    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
