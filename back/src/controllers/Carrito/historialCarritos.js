const { Carrito } = require('../../db');

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
    
    // Verificar si ya existe un carrito para el cliente
    const carritoExistente = await Carrito.findAll({
      where: {
        clienteId,
        pagado:true
      },
    });

    if (!carritoExistente.length) {
      return (`No existe un historial para el el cliente con ID ${clienteId}.`);
    }

    carritoExistente.map(inventario => inventario.dataValues.id = `inv-${inventario.dataValues.id}`)
    

    return carritoExistente;
  } catch (error) {
    console.error('Error al ver registro en el carrito:', error.message);
    throw error;
  }
};
