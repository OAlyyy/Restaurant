const express = require("express");
const router = express.Router();
const{ Category,Product }= require("../models");


// Getting products

router.get("/" ,async (req,res) => {  // request & respond , whenever using sequelize there should be async & wait
    try {
    const products  = await Product.findAll();
    res.json(products);
}catch (err) {
    res.status(400).send({ error: err})
}
});



// Getting products based on Category

router.get('/grouped', async (req, res) => {
    console.log('Received request for grouped categories');
    try {
        const products  = await Product.findAll({   
            include: {
                model: Category,
                attributes: ['type']
            },
            order: [[Category, 'type', 'ASC'],
            ['id', 'ASC'],],
        }

        );
            console.log("products grouped in server side =>",products );
            res.json(products);
        } catch (err) {
            res.json({ error: err });
        }
    });


    //Adding a product 

router.post("/add" ,async (req,res) => {  // request & respond
    console.log("server side i am hereee ")
    const product = req.body ; 

    await Product.create(product); // call sequelizer function and created db post
    res.json(product);
});


// Deleting a product

router.delete("/:productId", async (req,res) =>{
     console.log("trying to delete ");

      const productId = req.params.productId;
      await Product.destroy({
        where: {
          id: productId,
        },
      }); 

      console.log("successful  to delete ");
      return ;
    } 
  );
  

module.exports = router;