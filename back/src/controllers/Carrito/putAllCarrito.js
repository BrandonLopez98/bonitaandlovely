const { Carrito, HistorialDeProductos } = require("../../db");

module.exports = async carritoId => {
  try {
    const carrito = await Carrito.findByPk(carritoId);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }
    if (carrito.compra) {
      throw new Error("La compra ya ha sido realizada");
    }
    await carrito.update({ compra: true });
    const productosEnCarrito = await Carrito.getProductos();
    return productosEnCarrito;
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
