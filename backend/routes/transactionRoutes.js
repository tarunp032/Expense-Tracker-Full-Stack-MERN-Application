const express = require("express");
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes - All transaction routes require authentication
router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.get("/summary", authMiddleware, getSummary);
router.get("/:id", authMiddleware, getTransactionById);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
