const Transaction = require("../models/Transaction");

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware
    const {
      amount,
      type,
      category,
      description,
      date,
      paymentMethod,
      status,
      tags,
    } = req.body;

    // Validation
    if (!amount || !type || !category || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Type must be either income or expense" });
    }

    const transaction = new Transaction({
      userId,
      amount,
      type,
      category,
      description,
      date: date || new Date(),
      paymentMethod: paymentMethod || "cash",
      status: status || "completed",
      tags: tags || [],
    });

    await transaction.save();
    res.status(201).json({
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transactions for logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(200).json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const {
      amount,
      type,
      category,
      description,
      date,
      paymentMethod,
      status,
      tags,
    } = req.body;

    if (type && !["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Type must be either income or expense" });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      {
        amount,
        type,
        category,
        description,
        date: date || new Date(),
        paymentMethod: paymentMethod || "cash",
        status: status || "completed",
        tags: tags || [],
      },
      { new: true },
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get summary (total income, expense, balance)
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      message: "Summary retrieved successfully",
      data: {
        totalIncome,
        totalExpense,
        balance,
        totalTransactions: transactions.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
