'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      review.belongsTo(models.user);
      models.user.hasMany(review);
      review.belongsTo(models.item);
      models.item.hasMany(review);
    }
  }
  review.init({
    score: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review'
  });
  return review;
};
