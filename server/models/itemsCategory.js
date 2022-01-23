'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      itemsCategory.belongsTo(models.category);
      models.category.hasMany(itemsCategory);
      itemsCategory.belongsTo(models.item);
      models.item.hasMany(itemsCategory);
    }
  }
  itemsCategory.init({
    id1: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'itemsCategory'
  });
  return itemsCategory;
};
