const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subcategoria = sequelize.define('Subcategoria', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: 'subcategoria',timestamps: false });

  Subcategoria.associate = (models) => {
    Subcategoria.belongsTo(models.Categoria, {
      foreignKey: {
        allowNull: false,
        name: 'categoriaId',
      }
    });
  };

  return Subcategoria;
};
