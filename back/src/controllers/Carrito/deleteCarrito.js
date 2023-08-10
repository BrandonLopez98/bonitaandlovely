const { Carrito, Producto } = require("../../db");

module.exports = async (carritoId, productoId) => {
  try {
    const carrito = Carrito.findByPk(carritoId);
    if (!carrito) {
      throw new Error("carrito no encontrado");
    }
    await Carrito.destroy({
      where: {
        id: carritoId
      },
      include: [
        {
          model: Producto,
          where: {
            id: productoId
          }
        }
      ]
    });
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
