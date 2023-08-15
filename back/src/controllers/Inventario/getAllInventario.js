const { Inventario } = require('../../db');

module.exports = async () => {
  try {
    const inventarios = await Inventario.findAll();

    inventarios.map(inventario => inventario.dataValues.id = `inv-${inventario.dataValues.id}`)

    return inventarios;
    
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
