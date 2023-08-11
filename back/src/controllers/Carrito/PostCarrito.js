const { Carrito, Producto, Cliente } = require("../../db");

module.exports = async (clienteId, productoId) => {
  try {
    const cliente = await Cliente.findByPk(clienteId);
    
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }
    const carrito = await cliente.getCarritos({raw:true});
    if(!carrito){
      throw new Error("el cliente no tiene un carrito asociado");
    }

    if(carrito.compra){
      throw new Error("el carrito ya completo la compra")
    }
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Agregar el producto al carrito
    await carrito.addProducto(producto);
    return { message: "Producto agregado al carrito correctamente" };
  } catch (error) {
    console.error("Error al obtener el Carrito:", error.message);
    throw error;
  }
};
