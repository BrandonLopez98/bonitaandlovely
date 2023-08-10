const { Carrito, Producto } = require("../../db");


module.exports = async (carritoId, productoId, nuevaCantidad) =>{
   try{
    const carrito = await Carrito.findByPk(carritoId);
    const producto = await Producto.findByPk(productoId);
    if (carrito && producto) {
        const productoEnCarrito = await carrito.getProductos({
          where: { id: productoId }
        });
  
        if (productoEnCarrito.length > 0) {
          const item = productoEnCarrito.precio_compra;
          await item.update({ cantidad: nuevaCantidad });
        }
    }
   }catch(error){
    console.error("Error al actualizar la cantidad en el carrito:", error.message);
    throw error;
   }
}