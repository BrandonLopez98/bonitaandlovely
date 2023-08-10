const express = require('express');
const router = express.Router();

const getAllProducto = require('../controllers/Producto/getAllProductos')
const getIdProducto = require('../controllers/Producto/getIdProducto')
const getProductos = require('../controllers/Producto/getProductos')
const getNameProducto = require('../controllers/Producto/getNameProductos')
const postProducto = require('../controllers/Producto/postProducto')
const postProductoArray = require('../controllers/Producto/postProductoArray')
const putProducto = require('../controllers/Producto/putProducto')
const putActiveProducto = require('../controllers/Producto/putActiveProducto')
const deleteProducto = require('../controllers/Producto/deleteProducto')

router.get('/', async (req,res)=>{
  const {page,size,name} = req.query;
  try {
    if (name) {
      let producto = await getNameProducto(name)
      res.status(200).send(producto)
  } else if (page,size) {
    let producto = await getAllProducto(page,size)
    res.status(200).send({
      paginas: Math.ceil(producto.count / size),
      productos: producto.rows      
    }) 
  }else{
    let producto = await getProductos()
      res.status(200).send(producto)
  }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/:productoId', async (req,res)=>{
  const { productoId } = req.params
  try {
    let producto = await getIdProducto(productoId)
    res.status(200).send(producto)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, descripcion, precio_compra, imagenPrincipal, imagenes, porcentaje_ganancia, precio_venta, referencia_proveedor, marcaId, categoriaId, tamañoId, proveedorId, subcategoriaId } = req.body;

    if (Array.isArray(req.body)) {
      const Productos = await postProductoArray(req.body);
      res.status(200).json(Productos);
    } else {
      const Producto = await postProducto(name, descripcion, precio_compra, imagenPrincipal, imagenes, porcentaje_ganancia, precio_venta, referencia_proveedor, marcaId, categoriaId, tamañoId, proveedorId, subcategoriaId);
      res.status(200).json(Producto);
    }
  } catch (error) {
    res.status(500).json({ error: `Ha ocurrido un error al agregar el producto: ${error}` });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, descripcion, precio_compra, porcentaje_ganancia, precio_venta, referencia_proveedor, marcaId, categoriaId } = req.body;

    const productoActualizado = await putProducto(id, name, descripcion, precio_compra, porcentaje_ganancia, precio_venta, referencia_proveedor, marcaId, categoriaId);

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el producto.' });
  }
});

router.put('/activate/:productoId', async (req, res) => {
  const { productoId } = req.params;

  try {
    const producto = await putActiveProducto(productoId);
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al activar la marca:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al activar la marca.' });
  }
});

router.delete('/:productoId', async (req, res) => {
  const { productoId } = req.params;

  try {
    const updatedproducto = await deleteProducto(productoId);
    res.status(200).json(updatedproducto);
  } catch (error) {
    console.error('Error al desactivar la marca:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al desactivar la marca.' });
  }
});
module.exports = router;
