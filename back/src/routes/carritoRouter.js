const express = require('express');
const router = express.Router();

const getCarrito = require('../controllers/Carrito/getAllCarrito')
const postCarrito = require('../controllers/Carrito/PostCarrito')

// Ruta para crear un carrito
router.post('/', async (req, res) => {
    try {
        const { productoId } = req.body;
        const clienteId = req.usuario.id;
        
        await postCarrito(clienteId, productoId);

        res.status(201).json({ message: 'Carrito creado y producto agregado' });
    } catch (error) {
        console.error('Error al crear el carrito:', error.message);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get('/', async(req, res) => {
    try{
      const carrito = await getCarrito()
      res.status(200).json(carrito)
    }catch(error){
        console.error('Error al crear el carrito:', error.message);
        res.status(500).json({ error: 'Error al crear el carrito'});
    }
})
module.exports = router;
