const { Color } = require('../../db');

module.exports = async (nombre) => {
  try {
    function Primeraletramayuscula(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const name = Primeraletramayuscula(nombre);

    if (!name) {
      throw new Error('El nombre de color es inválido.');
    }

    // Verificar si ya existe un color con el mismo nombre
    const existingColor = await Color.findOne({
      where: {
        name: name,
      }
    });

    if (existingColor) {
      // Si ya existe un color con el mismo nombre, lanzar un error
      throw new Error(`El color ya existe: ${name}`);
    }

    // Si no existe un color con el mismo nombre, crear el nuevo color
    const newColor = await Color.create({
      name: name,
    });

    newColor.dataValues.id = `col-${newColor.dataValues.id}`;

    return newColor;
  } catch (error) {
    console.error('Error al crear el color:', error.message);
    throw error;
  }
};
