const { Marca } = require('../../db');

module.exports = async (array) => {
  const marcas = [];

  async function crearMarca(marca) {
    function primerLetraMayuscula(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    marca.name = primerLetraMayuscula(marca.name);

    try {
      if (!marca.name) {
        throw new Error('El nombre de marca es inválido.');
      }

      // Verificar si ya existe una marca con el mismo nombre
      const existingMarca = await Marca.findOne({
        where: {
          name: marca.name,
        },
      });

      if (existingMarca) {
        // Si ya existe una marca con el mismo nombre, lanzar un error
        throw new Error(`El nombre de marca ya existe: ${marca.name}`);
      }

      // Si no existe una marca con el mismo nombre, crear la nueva marca
      const newMarca = await Marca.create({
        id: marca.id,
        name: marca.name,
      });

      newMarca.dataValues.id = `mar-${newMarca.dataValues.id}`;

      marcas.push(newMarca);
    } catch (error) {
      console.error('Error al crear la marca:', error.message);
      throw error;
    }
  }

  try {
      await Promise.all(array.map(crearMarca));
    return marcas;
  } catch (error) {
    throw error;
  }
};
