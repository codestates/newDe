'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      items_category.belongsTo(models.category);
      models.category.hasMany(items_category);
      items_category.belongsTo(models.item);
      models.item.hasMany(items_category);
    }
  }
  items_category.init({
    id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'items_category'
  });
  return items_category;
};
