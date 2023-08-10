const { Carrito, Producto } = require("../../db");

module.exports = async () => {
  try {
    const carritosConProductos = await Carrito.findAll({
      include: [
        {
          model: Producto,
          attributes: ["id", "nombre", "precio_venta", "size", "color"]
        }
      ]
    });

    const allProducts = carritosConProductos.flatMap(carrito => {
      return carrito.Productos.map(producto => {
        return {
          id: producto.id,
          nombre: producto.nombre,
          precio_venta: producto.precio_venta,
          size: producto.size,
          color: producto.color,
          cantidad: carrito.cantidad
        };
      });
    });

    return allProducts;
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
