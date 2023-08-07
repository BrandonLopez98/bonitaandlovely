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

async function startServer() {
  try {
    // Sincronizamos la base de datos y forzamos la creación de tablas
    await conn.sync({ force: true });
    console.log('Database synchronized.');

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



