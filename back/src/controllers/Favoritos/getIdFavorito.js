const { Favoritos } = require('../../db');

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


    // Buscar todos los favoritos en la base de datos para el cliente dado
    const favoritos = await Favoritos.findAll({
      where: {
        clienteId,
      },
    });


    const favoritoIds = favoritos.map((favorito) => {
        return {
            id: `fav-${favorito.id}`,
            clienteId: `cli-${favorito.clienteId}`,
            productoId: `prod-${favorito.productoId}`
        }
    });
    return favoritoIds;
  } catch (error) {
    console.error('Error al obtener los IDs de los favoritos:', error.message);
    throw error;
  }
};
