require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_User, DB_Password, DB_host, DB_Name } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_User}:${DB_Password}@${DB_host}/${DB_Name}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => { modelDefiners.push(require(path.join(__dirname, '/models', file))) });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Establecemos las relaciones entre los modelos
const { Categoria, Subcategoria } = sequelize.models;

// Definimos las relaciones entre los modelos aquí
// Por ejemplo:
Categoria.hasMany(Subcategoria, { foreignKey: 'categoriaId' });
Subcategoria.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};