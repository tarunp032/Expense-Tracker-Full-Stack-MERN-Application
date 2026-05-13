import React from "react";
import { deleteTransaction } from "../services/api";
import "../styles/TransactionList.css";

function TransactionList({
  transactions,
  onTransactionDeleted,
  onTransactionUpdated,
}) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        onTransactionDeleted();
        alert("Transaction deleted successfully!");
      } catch (error) {
        alert("Error deleting transaction: " + error.message);
      }
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="no-transactions">
        No transactions found. Add one to get started!
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className={transaction.type}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                <span className={`badge ${transaction.type}`}>
                  {transaction.type === "income" ? "+" : "-"} {transaction.type}
                </span>
              </td>
              <td className={transaction.type}>
                {transaction.type === "income" ? "+" : "-"} ₹
                {transaction.amount.toFixed(2)}
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
