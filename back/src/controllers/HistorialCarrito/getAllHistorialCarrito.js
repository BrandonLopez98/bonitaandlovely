const {HistorialDeCarrito, Cliente, Producto} = require("../../db");

module.exports = async (clienteId) => {
    try{
        const cliente = await Cliente.findByPk(clienteId, {
            attributes: ['id', 'name']
        });
        if (!cliente) {
            throw new Error("Cliente no encontrado");
          }
      const historial = await HistorialDeCarrito.findAll({
        where:{
            clienteId:clienteId
        },
        include:[
            {
                model:Producto,
                attributes:["id", "name", "precio_venta"]
            }
        ]
      })
      const compraCliente = {
        cliente,
        historial
      }
      return compraCliente
    }catch(error){
        console.error("Error al obtener el historial:", error.message);
        throw error;
    }
}