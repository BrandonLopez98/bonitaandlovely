const { Cliente } = require('../../db');

module.exports = async () => {
  try {
    const clientes = await Cliente.findAll();
    clientes.map(cliente => cliente.dataValues.id = `cli-${cliente.dataValues.id}`)
    return clientes;
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    throw error;
  }
};
