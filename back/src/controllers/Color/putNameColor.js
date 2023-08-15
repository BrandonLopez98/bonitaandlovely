const { Color } = require('../../db');

module.exports = async (colorId, newName) => {
  try {
    // Buscar el color por su ID
    const color = await Color.findByPk(colorId);

    if (!color) {
      // Si no se encuentra el color, lanzar un error
      const error = new Error('El color no existe.');
      error.status = 404;
      throw error;
    }

    // Verificar si ya existe otro color con el mismo nombre
    const existingColor = await Color.findOne({
      where: {
        name: newName,
      },
    });

    if (existingColor) {
      // Si ya existe otro color con el mismo nombre, lanzar un error
      throw new Error(`Ya existe un color con el nombre: ${newName}`);
    }

    // Actualizar el nombre del color
    color.name = newName;
    await color.save();

    color.dataValues.id = `col-${color.dataValues.id}`;

    // Devolver el color actualizado
    return color;
  } catch (error) {
    console.error('Error al actualizar el nombre del color:', error.message);
    throw error;
  }
};
