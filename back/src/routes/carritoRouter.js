const express = require('express');
const router = express.Router();

const getCarrito = require('../controllers/Carrito/getAllCarrito')
const postCarrito = require('../controllers/Carrito/PostCarrito')


router.post('/', async(req, res) => {
    const {productoId} = req.params.productoId;
    try{
        const usuarioAutenticado = req.usuario;
    }catch{
    }
})


