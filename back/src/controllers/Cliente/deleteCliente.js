const { Cliente } = require('../../db');

module.exports = async (clienteId) => {
  try {
    // Buscar el cliente por su ID
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      // Si no se encuentra el cliente, lanzar un error
      const error = new Error('El cliente no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a false
    await cliente.update({ activa: false });

    cliente.dataValues.id = `cli-${cliente.dataValues.id}`;
    // Devolver el cliente actualizado
    return cliente;
  } catch (error) {
    console.error('Error al desactivar el cliente:', error.message);
    throw error;
  }
};
