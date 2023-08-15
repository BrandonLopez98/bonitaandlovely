const { Proveedor } = require('../../db');

module.exports = async () => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: ['id', 'name', 'link_catalogo', 'asesor', 'celular','activa'],
    });

    proveedores.map(proveedor => proveedor.dataValues.id = `cli-${proveedor.dataValues.id}`)
    return proveedores;
  } catch (error) {
    console.error('Error al obtener los Proveedores:', error.message);
    throw error;
  }
};
