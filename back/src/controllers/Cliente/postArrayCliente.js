const { Cliente } = require('../../db');

const postCarrito = require('../Carrito/postCarrito')

module.exports = async (clienteArray) => {
  const clientes = [];

  async function crearcliente(clienteData) {
    try {
      // Verificar si ya existe un cliente con el mismo nombre
      const existingCliente = await Cliente.findOne({
        where: {
          name: clienteData.name,
        },
      });

      if (existingCliente) {
        // Si ya existe un cliente con el mismo nombre, lanzar un error
        throw new Error(`Ya existe un cliente con el nombre: ${clienteData.nombre}`);
      }

      // Si no existe un cliente con el mismo nombre, crear el nuevo cliente
      const newcliente = await Cliente.create(clienteData);

      postCarrito({clienteId:newcliente.dataValues.id,productos:[]})

      newcliente.dataValues.id = `cli-${newcliente.dataValues.id}`;
      
      clientes.push(newcliente);
    } catch (error) {
      console.error('Error al crear el cliente:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(clienteArray.map(crearcliente));
    return clientes;
  } catch (error) {
    throw error;
  }
};
