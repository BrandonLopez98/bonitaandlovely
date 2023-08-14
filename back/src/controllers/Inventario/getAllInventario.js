const { Inventario } = require('../../db');

module.exports = async () => {
  try {
    const inventarios = await Inventario.findAll();

    return inventarios;
    
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
