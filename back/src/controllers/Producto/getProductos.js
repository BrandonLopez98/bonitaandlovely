const { Producto, Subcategoria, Imagen } = require('../../db');

module.exports = async () => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    const productosConImagenes = await Promise.all(
      productos.map(async (producto) => {
        const imagenes = await Imagen.findAll({
          where: {
            id: producto.imagenes, // Aquí usamos el array de IDs de imágenes del producto
          },
        });

        return {
          ...producto.dataValues,
          id: `prod-${producto.id}`,
          imagenes: imagenes,
        };
      })
    );


    return productosConImagenes;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
