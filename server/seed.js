const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const _ = require('lodash');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'level150',
    database: 'restaurants'
  });
  
  connection.connect(async (err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
  
    console.log('Connected to database.');
  
    const categories = ['breakfast', 'lunch', 'dinner', 'drinks'];
    const categoryInserts = categories.map((category) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO categories (type,createdAt,updatedAt) VALUES ('${category}', NOW(),NOW())`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  
    try {
      await Promise.all(categoryInserts);
  
      const imageUrls = [
        'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
        'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png',
        'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png',
      ];
  
  
      console.log('Generating product data...');
      const products = [];
      for (let i = 0; i < 30; i += 1) {
        const Type = _.random(1, categories.length);
        const newProduct = {
          name: faker.commerce.productName(),
          adjective: faker.commerce.productAdjective(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          type: Type,
          imageUrl: _.sample(imageUrls)
        };
        products.push(newProduct);
      }
  
      console.log("Single product's name: ", products[0].name); // console log added here
  
      const productInserts = products.map((product) => {
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO products (name, adjective, description, price, type, imageUrl,createdAt,updatedAt) 
            VALUES ('${product.name}', '${product.adjective}', '${product.description}', '${product.price}', '${product.type}', '${product.imageUrl}', NOW(),NOW())`,
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });
  
      await Promise.all(productInserts);
  
      console.log('Data successfully inserted into database.');
    } catch (err) {
      console.error('Error inserting data into database: ', err);
    } finally {
      connection.end();
      console.log('Disconnected from database.');
    }
  });