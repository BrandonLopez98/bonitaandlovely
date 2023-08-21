const express = require('express');
const router = express.Router();

const getIdReviewr = require('../controllers/Reviewr/getIdReviewr')
const postReviewr = require("../controllers/Reviewr/postReviewr")
const getReviewr = require("../controllers/Reviewr/getAllReviewrId")
const putReviewr = require("../controllers/Reviewr/putReviewr")

router.get('/:productoId', async (req, res) => {
    const { productoId } = req.params; // Cambia de req.query a req.params
    try {
      const productoReseña = await getReviewr(productoId);
      res.status(200).json(productoReseña);
    } catch (error) {
      console.error('Error al obtener la reseña:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al obtener la reseña.' });
    }
});


router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    try {
        const reviewr = await getIdReviewr(id)
        res.status(200).json(reviewr);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.post('/', async (req, res) => {
    const { clienteId, productoId, rating, comentario } = req.body;

    if (!clienteId || !productoId || !rating || !comentario) {
        return res.status(400).json({ error: 'Faltan propiedades en la solicitud.' });
    }

    try {
        const nuevaReseña = await postReviewr(clienteId, productoId, rating, comentario);
        res.status(201).json(nuevaReseña);
    } catch (error) {
        console.error('Error al agregar la reseña:', error.message);
        res.status(500).json({ error: 'Ha ocurrido un error al agregar la reseña: ' + error.message });
    }

});

router.put('/:productoId', async (req, res) => {
    const {productoId} = req.params;
    const {rating, comentario} = req.body;
    try{
        const reseñaActual = await putReviewr(productoId, rating, comentario)
        res.status(200).json(reseñaActual)
    }catch(error){
        console.error('Error al actualizar la reseña:', error.message);
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la reseña: ' + error.message });
    }
});
module.exports = router;