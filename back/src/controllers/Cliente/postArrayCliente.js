const { Cliente, Carrito } = require('../../db');

module.exports = async (clienteArray) => {
  const clientesConCarritos = [];

  async function crearClienteConCarrito(clienteData) {
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
      const newCliente = await Cliente.create(clienteData);

      // Crear un carrito asociado al cliente recién creado
      const newCarrito = await Carrito.create({
        clienteId: newCliente.id,
      });

      const clienteConCarrito = {
        ...newCliente.dataValues,
        carrito: newCarrito.dataValues,
      };

      clientesConCarritos.push(clienteConCarrito);
    } catch (error) {
      console.error('Error al crear el cliente:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(clienteArray.map(crearClienteConCarrito));
    return clientesConCarritos;
  } catch (error) {
    throw error;
  }
};
