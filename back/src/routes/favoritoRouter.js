const express = require('express');
const router = express.Router();


const getIdFavorito = require('../controllers/Favoritos/getIdFavorito')
const postFavorito = require('../controllers/Favoritos/postFavorito')
const postArrayFavorito = require('../controllers/Favoritos/postArrayFavorito')
const deleteFavorito = require('../controllers/Favoritos/deleteFavorito')

router.get('/:clienteId', async (req, res) => {
  const {clienteId} = req.params;

  try {
    const favoritoIds = await getIdFavorito(clienteId);
    res.status(200).json(favoritoIds);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los IDs de los favoritos: ${error.message}` });
  }
});

router.post('/', async (req, res) => {
    try {
  
      if (Array.isArray(req.body)) {
        const favoritos = await postArrayFavorito(req.body);
        res.status(200).json(favoritos);
      } else {
        const favorito = await postFavorito(req.body);
        res.status(200).json(favorito);
      }
    } catch (error) {
      console.error('Error al agregar el favorito:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al agregar el favorito.' });
    }
  });

  router.delete('/:idFav', async (req,res)=>{
    const {idFav} = req.params;
    try {
      const favoritoIds = await deleteFavorito(idFav);
    res.status(200).json(favoritoIds);
    } catch (error) {
      res.status(500).json({ error: `Error al borrar el favorito: ${error.message}` });
    }
  })

module.exports = router;
