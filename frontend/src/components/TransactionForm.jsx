import React, { useState } from "react";
import { addTransaction } from "../services/api";
import "../styles/TransactionForm.css";

function TransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
    referenceNumber: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = {
    expense: [
      "Food",
      "Transport",
      "Entertainment",
      "Utilities",
      "Shopping",
      "Healthcare",
      "Education",
      "Other",
    ],
    income: ["Salary", "Freelance", "Investment", "Bonus", "Gifts", "Other"],
  };

  const paymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
    "Wallet",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert payment method to backend format
      const paymentMethodMap = {
        Cash: "cash",
        "Credit Card": "credit_card",
        "Debit Card": "debit_card",
        UPI: "upi",
        "Net Banking": "bank_transfer",
        Wallet: "wallet",
      };

      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const submitData = {
        ...formData,
        paymentMethod: paymentMethodMap[formData.paymentMethod],
        tags: tagsArray,
      };

      await addTransaction(submitData);
      setFormData({
        amount: "",
        type: "expense",
        category: "Food",
        description: "",
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",
        referenceNumber: "",
        tags: "",
      });
      onTransactionAdded();
      alert("Transaction added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add New Transaction</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Type: </label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category: </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories[formData.type].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
      </div>

      <div className="form-group">
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Payment Method: </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Reference Number (Optional): </label>
        <input
          type="text"
          name="referenceNumber"
          value={formData.referenceNumber}
          onChange={handleChange}
          placeholder="Invoice/Receipt number"
        />
      </div>

      <div className="form-group">
        <label>Tags/Notes (Optional): </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Add tags or additional notes"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
