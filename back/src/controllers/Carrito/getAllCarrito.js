const { Carrito, Producto } = require("../../db");

module.exports = async () => {
  try {
    const carrito = Carrito.findAll({
      include: [
        {
          model: Producto,
          attributes: ["id", "nombre", "precio_venta", "size" , "color"]
        }
      ]
    });
    const allProducts = carrito.flatMap(carrito => carrito.Productos);
    return allProducts;
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
