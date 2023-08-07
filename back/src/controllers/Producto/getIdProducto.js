const { Producto, Subcategoria } = require('../../db');

module.exports = async (productoId) => {
  try {

    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
    
      if (match) {
        return parseInt(match[0]); // Convierte el valor coincidente en un número entero
      }
    
      return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
    }

    productoId = extractNumberFromString(productoId)

    const producto = await Producto.findOne({
      where:{
        id: productoId
      },
      include: 
      {
          model: Subcategoria,
          attributes: ['name'],
          through: { attributes: [] },
        },
    });

    if (!producto) {
      const error = new Error('producto no encontrado.');
      error.status = 404;
      throw error;
    }

    producto.dataValues.id = `prod-${producto.dataValues.id}`;

    return producto;
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    throw error;
  }
};
