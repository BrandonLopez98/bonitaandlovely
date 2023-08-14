const express = require('express');
const router = express.Router();

const getIdCarrito = require('../controllers/Carrito/getIdCarrito')
const postCarrito = require('../controllers/Carrito/postCarrito');
const postArrayCarrito = require('../controllers/Carrito/postArrayCarrito')

router.get('/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const carrito = await getIdCarrito(clientesId);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {

    if (Array.isArray(req.body)) {
      const carritos = await postArrayCarrito(req.body);
      res.status(200).json(carritos);
    } else {
      const { clienteId, productos } = req.body;

    if (!clienteId || !productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Datos de cliente y productos requeridos en el cuerpo de la solicitud.' });
    }

    const carrito = await postCarrito({ clienteId, productos });
    res.status(200).json(carrito);
    }
  } catch (error) {
    res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
  }
});

module.exports = router;
