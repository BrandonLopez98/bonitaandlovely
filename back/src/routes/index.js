const { Router } = require('express');
const categoriaRouter = require('./categoriaRouter')
const subCategoriaRouter = require('./subCategoriaRouter')
const marcaRouter = require('./marcaRouter')
const sizeRouter = require('./sizeRouter')
const proveedorRouter = require('./proveedorRouter')
const descuentoRouter = require('./descuentoRouter')
const colorRouter = require('./colorRouter')
const productoRouter = require('./productoRouter')
const imagenRouter = require('./imagenRouter')

const router = Router();


router.use('/categoria',categoriaRouter)
router.use('/subcategoria',subCategoriaRouter)
router.use('/marca',marcaRouter)
router.use('/size',sizeRouter)
router.use('/proveedor',proveedorRouter)
router.use('/descuento',descuentoRouter)
router.use('/color',colorRouter)
router.use('/producto',productoRouter)
router.use('/imagen',imagenRouter)



module.exports = router;

