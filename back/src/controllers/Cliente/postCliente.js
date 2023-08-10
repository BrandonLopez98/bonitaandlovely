const { Cliente } = require('../../db');

module.exports = async (clienteData) => {
  try {
    // Verificar si ya existe un cliente con el mismo nombre
    const existingcliente = await Cliente.findOne({
      where: {
        name: clienteData.name,
      },
    });

    if (existingcliente) {
      // Si ya existe un cliente con el mismo nombre, lanzar un error
      const error = new Error('Ya existe un cliente con este nombre.');
      error.status = 400;
      throw error;
    }

    // Si no existe un cliente con el mismo nombre, crear el nuevo cliente
    const newcliente = await Cliente.create(clienteData);

    return newcliente;
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    throw error;
  }
};
