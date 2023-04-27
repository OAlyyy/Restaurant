module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Category.associate = (models) => {
      Category.hasMany(models.Product, {
          foreignKey: {
              name: 'type',
              allowNull: false,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      });
  }

    return Category;
  };
  