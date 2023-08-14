const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const helmet = require('helmet'); // Agregamos el paquete 'helmet' para seguridad
const mercadopago = require("mercadopago");
require('dotenv').config()
const { MERCADO_PAGO_ACCESS_TOKEN, MERCADO_PAGO_KEY } = process.env
mercadopago.configure({
  access_token: MERCADO_PAGO_ACCESS_TOKEN,
});


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(helmet()); // Utilizamos el paquete 'helmet' para agregar capas de seguridad

// Colocamos el middleware de configuración CORS antes del middleware 'morgan'
server.use(morgan('dev'));

server.use('/', routes);

// Agregamos manejadores específicos para distintos tipos de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Implementamos un manejo de errores más robusto, registrando los errores en un archivo de registro
server.use((err, req, res, next) => {
  // Aquí podrías agregar el código para guardar los errores en un archivo de registro o en una base de datos de registro de errores
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});

//Mercado pago:
server.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "client", "index.html");
  res.sendFile(filePath);
});

server.post("/pagoCarrito", (req, res) => {
  const productos = req.body;

  let items = productos.map((producto) => {
    return {
      id: producto.id,
      title: producto.nombre,
      unit_price: Number(producto.precio),
      description: producto.descripcion,
    };
  });

  let preference = {
    items: items,
    back_urls: {
      success: "http://localhost:3000",
      failure: "http://localhost:3000",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then((response)=> {
      res.status(200).send({ response });
    })
    .catch((error)=> {
      res.status(400).send(error.message);
    });
});

server.post("/pago", (req, res) => {
  const producto = req.body;

  let preference = {
    items: [
      {
        id: producto.id,
        title: producto.nombre,
        unit_price: Number(producto.precio),
        description: producto.descripcion,
        quantity: 1
      },
    ],
    back_urls: {
      success: "http://localhost:3000/catalogo",
      failure: "http://localhost:3000",
      pending: "",
    },
    auto_return: "approved",
    binary_mode:true,
  };

  mercadopago.preferences
    .create(preference)
    .then((response)=> {
   res.status(200).send({response})
    })
    .catch((error)=> {
      res.status(400).send(error.message)
    });
});


module.exports = server;
