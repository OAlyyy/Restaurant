const express = require("express");
const router = express.Router();
const { Orders, Product } = require("../models");


// Create new order
router.post("/", async (req, res) => {
  try {
    const order = req.body;
    await Orders.create(order);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get current last order number 
router.get("/lastOrderNumber", async (req, res) => {
  try {
    const lastOrderNumber = await Orders.findOne({
      order: [["orderNumber", "DESC"]],
    });
    res.json(lastOrderNumber.orderNumber);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get single order by orderNumber
router.get("/:orderNumber", async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        orderNumber: req.params.orderNumber,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});



// Update existing order
router.put("/orderStatus", async (req, res) => {

   const { newStatus, id } = req.body;
   await Orders.update({ status: newStatus }, { where: {id: id}});
   res.json(newStatus);
});


// Delete existing order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
