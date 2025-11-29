const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/userAuth");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

paymentRouter.post("/create-order", userAuth, createOrder);
paymentRouter.post("/verifypayment", userAuth, verifyPayment);

module.exports = paymentRouter;
