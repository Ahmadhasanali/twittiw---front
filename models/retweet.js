'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Retweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Retweet.init({
    retweetId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Retweet',
  });
  Retweet.associate = function(models){
    Retweet.belongsTo(models.Post, {foreignKey: 'postId', as: 'post'})
    Retweet.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  }
  return Retweet;
};