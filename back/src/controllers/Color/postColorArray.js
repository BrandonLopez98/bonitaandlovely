const { Color } = require('../../db');

module.exports = async (coloresArray) => {
  const colores = [];

  async function crearColor(nombre) {
    try {
      if (typeof nombre !== 'string') {
        throw new Error('El nombre de color es inválido.');
      }

      const name = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
      if (!name) {
        throw new Error('El nombre de color es inválido.');
      }

      // Verificar si ya existe un color con el mismo nombre
      const existingColor = await Color.findOne({
        where: {
          name: name,
        },
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

      colores.push(newColor);
    } catch (error) {
      console.error('Error al crear el color:', error.message);
      throw error;
    }
  }

  try {
    if (!Array.isArray(coloresArray)) {
      throw new Error('Se esperaba un array de colores.');
    }

    await Promise.all(coloresArray.map((color)=>crearColor(color.nombre)));
    return colores;
  } catch (error) {
    throw error;
  }
};
