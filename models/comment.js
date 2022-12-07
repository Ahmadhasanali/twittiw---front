'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    commentId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  Comment.associate = function(models){
    Comment.belongsTo(models.Post, {foreignKey: 'postId', as: 'post'})
    Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  }
  return Comment;
};