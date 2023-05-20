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
  
      // Step number #4.1 Insert your Categories types to Database
      // Step number #4.2 Run node seed.js

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
      console.log('Data successfully inserted into database.');
    } catch (err) {
      console.error('Error inserting data into database: ', err);
    } finally {
      connection.end();
      console.log('Disconnected from database.');
    }
  });