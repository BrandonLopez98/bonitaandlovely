const { Favoritos } = require('../../db');

module.exports = async (favoritoId) => {
  try {

    function extractNumberFromString(inputString) {
        const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
        if (match) {
          return parseInt(match[0]); // Convierte el valor coincidente en un número entero
        }
        return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
      }  
      favoritoId = extractNumberFromString(favoritoId)

    // Verificar si el favorito existe
    const favoritoExistente = await Favoritos.findByPk(favoritoId);

    if (!favoritoExistente) {
      throw new Error(`El favorito con ID ${favoritoId} no existe.`);
    }

    // Eliminar el favorito de la base de datos
    await favoritoExistente.destroy();

    return { message: 'Favorito eliminado exitosamente.' };
  } catch (error) {
    console.error('Error al eliminar el favorito:', error.message);
    throw error;
  }
};
