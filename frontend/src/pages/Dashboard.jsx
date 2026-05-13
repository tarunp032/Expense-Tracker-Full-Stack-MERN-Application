import React, { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ChartComponent from "../components/ChartComponent";
import { getTransactions, getSummary } from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      setTransactions(response.data.data);
    } catch (err) {
      setError("Error fetching transactions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await getSummary();
      setSummary(response.data.data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const handleTransactionAdded = () => {
    fetchTransactions();
    fetchSummary();
  };

  const handleTransactionDeleted = () => {
    fetchTransactions();
    fetchSummary();
  };

  if (loading && transactions.length === 0) {
    return <div className="loading">Loading transactions...</div>;
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Manage your income and expenses efficiently</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>₹{summary.totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expense</h3>
          <p>₹{summary.totalExpense.toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p className={summary.balance >= 0 ? "positive" : "negative"}>
            ₹{summary.balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts */}
      {transactions.length > 0 && (
        <ChartComponent transactions={transactions} />
      )}

      <div className="content-wrapper">
        {/* Transaction Form */}
        <TransactionForm onTransactionAdded={handleTransactionAdded} />

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onTransactionDeleted={handleTransactionDeleted}
          onTransactionUpdated={handleTransactionAdded}
        />
      </div>
    </div>
  );
}

export default Dashboard;
