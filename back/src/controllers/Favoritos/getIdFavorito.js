const { Favoritos, Cliente } = require('../../db');

module.exports = async (clienteId) => {

  function esCorreo(clientId) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s]{2,}$/;
    return pattern.test(clientId);
  }

  let correo_electronico;

  try {

    if (esCorreo(clienteId)) {
      const clienteExistente = await Cliente.findOne({
        where: {
          correo_electronico: clienteId,
        },
      });

      if (!clienteExistente) {
        throw new Error(`El cliente con correo ${correo_electronico} no existe.`);
      } else{
        clienteId = clienteExistente.dataValues.id
        correo_electronico = clienteExistente.dataValues.correo_electronico
      }

    }else{
      function extractNumberFromString(inputString) {
        const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
        if (match) {
          return parseInt(match[0]); // Convierte el valor coincidente en un número entero
        }
        return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
      }  
      clienteId = extractNumberFromString(clienteId)

      const clienteExistente = await Cliente.findByPk(clienteId);
    
      if (!clienteExistente) {
        throw new Error(`El cliente con ID ${clienteId} no existe.`);
      }else{
        correo_electronico = clienteExistente.dataValues.correo_electronico
      }
    }


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
            correo_electronico:correo_electronico,
            productoId: `prod-${favorito.productoId}`
        }
    });
    return favoritoIds;
  } catch (error) {
    console.error('Error al obtener los IDs de los favoritos:', error.message);
    throw error;
  }
};