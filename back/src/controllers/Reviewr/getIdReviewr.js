const { Reviwers, Cliente } = require('../../db');

module.exports = async (productoId) => {
  const productIdMatch = productoId.match(/\d+/); 
  const productIdNumber = productIdMatch ? parseInt(productIdMatch[0]) : null; 

  try {
    const reseñas = await Reviwers.findAll({
      where: {
        productoId: productIdNumber
      }
    });

    if (!reseñas || reseñas.length === 0) {
      return (`Las reseñas del producto con ID ${productIdNumber} no se encontraron`);
    }

    const reseñasConName = await Promise.all(reseñas.map(async (reseña) => {
      const cliente = await Cliente.findOne({
        where: {
          id: reseña.clienteId
        }
      });
      return {
        ...reseña.toJSON(),
        nameClient: cliente ? cliente.name : 'desconocido:c'
      };
    }));

    return reseñasConName;
  } catch (error) {
    console.error('Error al traer las reseñas en la base de datos:', error.message);
    throw error;
  }
};