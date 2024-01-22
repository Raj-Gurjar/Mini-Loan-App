const express = require("express");
const router = express.Router();

const authentication = require("../middleware/authentication");
const {
  createLoan,
  getAllLoans,
  getLoansById,
  getPaymentsById,
  doPayment,
  updateState,
} = require("../controllers/loan");

router.post("/createLoan", authentication, createLoan);
router.get("/allLoans", authentication, getAllLoans);
router.get("/loans/:id", authentication, getLoansById);
router.get("/payments/:id", authentication, getPaymentsById);
router.post("/doPayment", authentication, doPayment);
router.put("/update", authentication, updateState);

module.exports = router;
