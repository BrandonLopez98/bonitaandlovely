const express = require('express');
const router = express.Router();

const getAllColor = require('../controllers/Color/getAllColor')
const postColor = require('../controllers/Color/postColor')
const postColorArray = require('../controllers/Color/postColorArray')
const putNameColor = require('../controllers/Color/putNameColor')
const putActiveColor = require('../controllers/Color/putActiveColor')
const deleteColor = require('../controllers/Color/deleteColor')

// Ruta para obtener todos los colores
router.get('/', async (req, res) => {
  try {
    const colores = await getAllColor();
    res.status(200).json(colores);
  } catch (error) {
    console.error('Error al obtener los colores:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los colores.' });
  }
});

router.post('/', async (req, res) => {
    const { nombre, id } = req.body;
  
    try {
      if (Array.isArray(req.body)) {
        const colores = await postColorArray(req.body);
        res.status(200).json(colores);
      } else {
        const color = await postColor(nombre, id);
        res.status(200).json(color);
      }
    } catch (error) {
      console.error('Error al crear el color:', error.message);
      res.status(500).json({ error: `Ha ocurrido un error al crear el color: ${error.message}` });
    }
  });

  router.put('/:colorId', async (req, res) => {
    const { colorId } = req.params;
    const { newName } = req.body;
  
    try {
      const color = await putNameColor(colorId, newName);
      res.status(200).json(color);
    } catch (error) {
      console.error('Error al actualizar el nombre del color:', error.message);
      res.status(500).json({ error: `Ha ocurrido un error al actualizar el nombre del color: ${error.message}` });
    }
  });

  router.put('/activate/:colorId', async (req, res) => {
    const { colorId } = req.params;
  
    try {
      const color = await putActiveColor(colorId);
      res.status(200).json(color);
    } catch (error) {
      console.error('Error al activar el color:', error.message);
      res.status(500).json({ error: `Ha ocurrido un error al activar el color: ${error.message}` });
    }
  });

  router.delete('/:colorid', async (req, res) => {
    const { colorid } = req.params;
  
    try {
      const updatedCategoria = await deleteColor(colorid);
      res.status(200).json(updatedCategoria);
    } catch (error) {
      console.error('Error al desactivar la categoría:', error.message);
      res.status(500).json({ error: `Ha ocurrido un error al desactivar la categoría: ${error.message}`, });
    }
  });

module.exports = router;
