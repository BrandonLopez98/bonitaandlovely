const { Cliente } = require('../../db');

module.exports = async (clienteId) => {
  try {

    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
      if (match) {
        return parseInt(match[0]); // Convierte el valor coincidente en un número entero
      }    
      return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
    }

    clienteId = extractNumberFromString(clienteId)

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      const error = new Error('cliente no encontrado.');
      error.status = 404;
      throw error;
    }

    cliente.dataValues.id = `cli-${cliente.dataValues.id}`;

    return cliente;
  } catch (error) {
    console.error('Error al obtener el cliente:', error.message);
    throw error;
  }
};
