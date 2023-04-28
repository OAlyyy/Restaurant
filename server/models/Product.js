module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      default: "later",
      },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Category, {
        foreignKey: {
          name: "type",
          allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };

    
    return Product;
  };