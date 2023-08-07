const express = require('express');
const router = express.Router();

const getAllImagen = require('../controllers/Imagen/getAllImagen')
const postImagen = require('../controllers/Imagen/postImagen');
const postImagenArray = require('../controllers/Imagen/postImagenArray');
const putUrlImagen = require('../controllers/Imagen/putUrlImagen')
const putActiveImagen = require('../controllers/Imagen/putActiveImagen')
const deleteImagen = require('../controllers/Imagen/deteleImagen')

router.get('/', async (req,res)=>{
  try {
    let imagenes = await getAllImagen()
    res.status(200).send(imagenes)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/', async (req, res) => {

  let { Url } = req.body;

  try {
    if (Array.isArray(req.body)) {
      const imagenes = await postImagenArray(req.body)
      res.status(200).send(imagenes);
    }else{
      const imagen =  await postImagen(Url);
      res.status(200).send(imagen);
    }
    
  } catch (error) {
    res.status(500).send({ error: error.message }); 
  }
});

router.put('/:imagenId', async (req, res) => {
  const { imagenId } = req.params;
  const { newUrl } = req.body;

  try {
    const updatedimagen = await putUrlImagen(imagenId, newUrl);
    res.status(200).json(updatedimagen);
  } catch (error) {
    console.error('Error al actualizar el nombre de la imagen:', error);
    res.status(500).json({ error: `Ha ocurrido un error al actualizar el nombre de la imagen: ${error.message}` });
  }
});

router.put('/activate/:imagenId', async (req, res) => {
  const { imagenId } = req.params;

  try {
    const imagen = await putActiveImagen(imagenId);
    res.status(200).json(imagen);
  } catch (error) {
    console.error('Error al activar la imagen:', error);
    res.status(500).json({ error: `Ha ocurrido un error al activar la imagen: ${error.message}` });
  }
});

router.delete('/:imagenId', async (req, res) => {
  const { imagenId } = req.params;

  try {
    const updatedimagen = await deleteImagen(imagenId);
    res.status(200).json(updatedimagen);
  } catch (error) {
    console.error('Error al desactivar la imagen:', error.message);
    res.status(500).json({ error: `Ha ocurrido un error al desactivar la imagen: ${error.message}`, });
  }
});

module.exports = router;
