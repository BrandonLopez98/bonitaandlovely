const { Cliente, Carrito } = require('../../db');

module.exports = async () => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ['id', 'name', 'fecha_nacimiento', 'telefono', 'correo_electronico', 'direccion', 'contraseña', 'activa'],
      include: {
        model: Carrito,
        as: 'carritos',
        attributes: ['id'] // Puedes seleccionar los atributos que deseas incluir del carrito
      }
    });

    const clientesFormatted = clientes.map(cliente => ({
      ...cliente.dataValues,
      id: `cli-${cliente.dataValues.id}`
    }));
    return clientesFormatted;
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    throw error;
  }
};
