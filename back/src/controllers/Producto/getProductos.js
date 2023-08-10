const { Producto, Subcategoria, Marca, Categoria, Size, Proveedor} = require('../../db');

module.exports = async () => {
  try {
    
    const productos = await Producto.findAll({
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    const productosConSubcategorias = await Promise.all(productos.map(async (producto) => {
      const marca = await Marca.findByPk(producto.dataValues.marcaId);
      const categoria = await Categoria.findByPk(producto.dataValues.categoriaId);
      const size = await Size.findByPk(producto.dataValues.tamañoId);
      const proveedor = await Proveedor.findByPk(producto.dataValues.proveedorId);
      const subcategorias = producto.Subcategoria.map((subcategoria) => subcategoria.name);
      return {
        ...producto.dataValues,
        id: `prod-${producto.dataValues.id}`,
        Subcategoria: subcategorias,
        marcaId: marca.name, 
        categoriaId: categoria.name,
        tamañoId: size.name,
        proveedorId: proveedor.name
      };
    }));

    return productosConSubcategorias;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
