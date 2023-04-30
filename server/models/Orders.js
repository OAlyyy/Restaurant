module.exports = (sequelize, DataTypes) => {
    const Orders  = sequelize.define("Orders", {
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
      },
      status: {
        type: DataTypes.ENUM('pending', 'ready', 'shipped', 'delivered'),
        defaultValue: 'pending'
      },
      items: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      shippingAddress: {
        type: DataTypes.STRING,
        default:"Dining In",
        allowNull: false
      },
      paymentMethod: {
        type: DataTypes.ENUM('cash', 'credit card', 'paypal'),
        allowNull: false
      }
    });
  
  
    return Orders ;
  };