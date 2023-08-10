const { Cliente } = require('../../db');

module.exports = async (clienteId, dataToUpdate) => {
  try {
    // Buscar el cliente por su ID
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      // Si no se encuentra el cliente, lanzar un error
      const error = new Error('El cliente no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar los datos del cliente
    await cliente.update(dataToUpdate);

    // Concatenar "cli-" al ID del cliente actualizado
    cliente.dataValues.id = `cli-${cliente.dataValues.id}`;
    

    // Devolver el cliente actualizado
    return cliente;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error.message);
    throw error;
  }
};
