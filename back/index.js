//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require('./src/app');
const { conn } = require('./src/db');
const { PORT } = process.env;

const postCategoriaArray = require ('./src/controllers/Categoria/postCategoriaArray')
const categoriaData = require('../json/categorias.json');
const postSubCategoriaArray = require('./src/controllers/SubCategoria/postSubCategoriaArray')
const subCategoriaData = require('../json/subCategorias.json')

const postArrayMarca = require('./src/controllers/Marca/postArrayMarca')
const MarcaData = require('../json/Marca.json')
const postArraySize = require('./src/controllers/size/postArraySize');
const SizeData = require('../json/Size.json')
const postArrayProveedor = require('./src/controllers/Proveedor/postArrayProveedor');
const ProveedorData = require('../json/Proveedores.json')
const postArrayImagen = require('./src/controllers/Imagen/postImagenArray');
const ImagenData = require('../json/imagen.json')
const postArrayProducto = require('./src/controllers/Producto/postProductoArray');
const ProductoData = require('../json/ProductoConImagenes.json')
const postArrayCliente = require('./src/controllers/cliente/postArrayCliente');
const ClienteData = require('../json/cliente.json')
const postArrayFavorito = require('./src/controllers/Favoritos/postArrayFavorito')
const FavoritoData = require('../json/Favoritos.json')

async function loadCategoriaData() {
  try {
      await postCategoriaArray(categoriaData)
      console.log('Categoría data loaded');

      await postSubCategoriaArray(subCategoriaData);
      console.log('Subcategoría data loaded.');

      await postArrayMarca(MarcaData);
      console.log('Marca data loaded.');

      await postArraySize(SizeData);
      console.log('tamaño data loaded.');

      await postArrayProveedor(ProveedorData);
      console.log('proveedor data loaded.');

      await postArrayImagen(ImagenData);
      console.log('Imagen data loaded.');

      await postArrayProducto(ProductoData);
      console.log('Producto data loaded.');

      await postArrayCliente(ClienteData);
      console.log('Cliente data loaded.');

      await postArrayFavorito(FavoritoData);
      console.log('Favorito data loaded.');

  } catch (error) {
    console.error('Error loading categoría data:', error.message);
  }
}

async function startServer() {
  try {
    // Sincronizamos la base de datos y forzamos la creación de tablas
    await conn.sync({ force: false });
    console.log('Database synchronized.');

    // Cargamos los datos de categoría desde el archivo JSON
    await loadCategoriaData();

    // Iniciamos el servidor para escuchar en el puerto
    server.listen(PORT, () => {
      console.log('Server listening on port', PORT);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1); // Salimos con un código de error en caso de un problema
  }
}

startServer();
