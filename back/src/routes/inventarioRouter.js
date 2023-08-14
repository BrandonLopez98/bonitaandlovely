const express = require('express');
const router = express.Router();

const getAllInventario = require('../controllers/Inventario/getAllInventario')
const getIdInventario = require('../controllers/Inventario/getIdInventario')
const getIdColorInventario = require('../controllers/Inventario/getIdColorInventario')
const postInventario = require('../controllers/Inventario/postInventario')
const postArrayInventario = require ('../controllers/Inventario/postArrayInventario.js')
const putVentaInventario = require('../controllers/Inventario/putVentaInventario')
const putCompraInventario = require('../controllers/Inventario/putCompraInventario')

router.get('/:productoId/:colorId', async (req, res) => {
  const {productoId,colorId} = req.params;

  try {
    const inventarios = await getIdColorInventario(productoId,colorId);
    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los IDs de los favoritos: ${error.message}` });
  }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
  
    try {
      const inventarios = await getIdInventario(id);
      res.status(200).json(inventarios);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener los IDs de los favoritos: ${error.message}` });
    }
  });
  

router.get('/', async (req,res)=>{
    try {
      let inventarios = await getAllInventario()
      res.status(200).send(inventarios)
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

router.post('/', async (req, res) => {
    try {
  
      if (Array.isArray(req.body)) {
        const inventarios = await postArrayInventario(req.body);
        res.status(200).json(inventarios);
      } else {
        const inventario = await postInventario(req.body);
        res.status(200).json(inventario);
      }
    } catch (error) {
      console.error('Error al agregar el inventario:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al agregar el inventario.' });
    }
  });

  router.put('/venta/:productoId/:colorId/:cantidad', async (req, res) => {
    const { productoId, colorId, cantidad } = req.params;
  
    try {
      const respuesta = await putVentaInventario(productoId, colorId, parseInt(cantidad));
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(500).json({ error: `Error al restar cantidad del inventario: ${error.message}` });
    }
  });

  router.put('/compra/:productoId/:colorId/:cantidad', async (req, res) => {
    const { productoId, colorId, cantidad } = req.params;
  
    try {
      const respuesta = await putCompraInventario(productoId, colorId, parseInt(cantidad));
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(500).json({ error: `Error al restar cantidad del inventario: ${error.message}` });
    }
  });
 
module.exports = router;
