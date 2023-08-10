const express = require('express');
const router = express.Router();

const getAllCliente = require('../controllers/cliente/getAllCliente');
const getIdCliente = require('../controllers/cliente/getIdCliente');
const postCliente = require('../controllers/cliente/postCliente');
const postArrayCliente = require('../controllers/cliente/postArrayCliente');
const putPropsCliente = require('../controllers/cliente/putPropsCliente')
const deleteCliente = require('../controllers/cliente/deleteCliente')
const putActiveCliente = require('../controllers/cliente/putActiveCliente')

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await getAllCliente();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los clientes.' });
  }
});

// Ruta para obtener un cliente por su ID
router.get('/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const cliente = await getIdCliente(clientesId);
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener el cliente.' });
  }
});

// Ruta para agregar un cliente
router.post('/', async (req, res) => {
  try {
    
    if (Array.isArray(req.body)) {
      const clientes = await postArrayCliente(req.body);
      res.status(200).json(clientes);
    } else {
      const cliente = await postCliente(req.body);
      res.status(200).json(cliente);
    }
  } catch (error) {
    console.error('Error al agregar el cliente:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al agregar el cliente.' });
  }
});

router.put('/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  
  try {
    const cliente = await putPropsCliente(clientesId, req.body);

    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el cliente.' });
  }
});

router.put('/activate/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const cliente = await putActiveCliente(clientesId); // Usar el controlador para cambiar activa a true
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al cambiar el estado del cliente:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al cambiar el estado del cliente.' });
  }
});

router.delete('/:clientesId', async (req, res) => {
  const { clientesId } = req.params;

  try {
    const cliente = await deleteCliente(clientesId);
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar el cliente.' });
  }
});
module.exports = router;
