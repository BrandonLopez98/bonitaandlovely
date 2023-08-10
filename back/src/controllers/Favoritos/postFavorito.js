const { Favoritos, Producto, Cliente } = require('../../db');

module.exports = async (favorito) => {
  try {

    const {correo_electronico,productoId} = favorito

    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findOne({
      where: {
        correo_electronico,
      },
    });
    
    if (!clienteExistente) {
      throw new Error(`El cliente con ID ${correo_electronico} no existe.`);
    }

    // Verificar si el producto existe
    const productoExistente = await Producto.findByPk(productoId);
    if (!productoExistente) {
      throw new Error(`El producto con ID ${productoId} no existe.`);
    }

    // Verificar si el producto favorito ya existe para este cliente
    const favoritoExistente = await Favoritos.findOne({
      where: {
        correo_electronico,
        productoId,
      },
    });

    if (favoritoExistente) {
      throw new Error('El producto ya está en la lista de favoritos del cliente.');
    }

    // Crear el registro de producto favorito en la base de datos
    let nuevoFavorito = await Favoritos.create({
      correo_electronico,
      productoId,
    });

    nuevoFavorito = {
        id: `fav-${nuevoFavorito.id}`,
        correo_electronico: `cli-${nuevoFavorito.correo_electronico}`,
        productoId: `prod-${nuevoFavorito.productoId}`
    }


    return nuevoFavorito;
  } catch (error) {
    console.error('Error al agregar producto favorito:', error.message);
    throw error;
  }
};
