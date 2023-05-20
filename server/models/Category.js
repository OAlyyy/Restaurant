module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    
    // Step number #3 Change Categories to have them in Database
    type: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner','drinks'),
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Category;
};
