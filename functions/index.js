/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");


// Routers


const productRouter= require('./routes/Product')
app.use("/product",productRouter);

const userRouter = require('./routes/User');
app.use('/user/', userRouter);


const ordersRouter = require('./routes/Orders');
app.use('/orders/', ordersRouter);


const paymentRouter= require('./routes/Payment')
app.use("/payment", paymentRouter);



// End Routers



db.sequelize.sync().then(() => {
  app.listen(3001, () => { 
      console.log("Server running on port 3001");
      });  
  }).catch((e)=>{
      console.log(e);
  })


  // app.get("/", (req,res) => { 
  //   res.json({message : "Welcome to the Future of Ordering"});
  //   });  

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });