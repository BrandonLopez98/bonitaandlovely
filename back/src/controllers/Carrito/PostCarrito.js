const { Carrito, Producto } = require("../../db");

module.exports = async (carritoId, productoId) => {
  try {
    const carrito = Carrito.findByPk(carritoId);
    const producto = Producto.findByPk(productoId);

    if (carrito.compra) {
      throw Error("El carrito ya completo la compra");
    }
    if (!carrito) {
      throw Error("El carrito no existe");
    }

    if (producto) {
      await carrito.addProducto(producto);
    } else {
      throw Error("producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
