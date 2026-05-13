import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/ChartComponent.css";

function ChartComponent({ transactions }) {
  // Prepare data for Income vs Expense chart
  const getSummaryData = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });

    return [
      { name: "Income", value: income, fill: "#10b981" },
      { name: "Expense", value: expense, fill: "#ef4444" },
    ];
  };

  // Prepare data for category breakdown
  const getCategoryData = () => {
    const categoryMap = {};

    transactions.forEach((t) => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      if (t.type === "expense") {
        categoryMap[t.category] += t.amount;
      }
    });

    return Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0);
  };

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
  ];
  const summaryData = getSummaryData();
  const categoryData = getCategoryData();

  return (
    <div className="chart-container">
      <h2>Financial Overview</h2>

      <div className="charts-grid">
        {/* Income vs Expense Bar Chart */}
        <div className="chart-wrapper">
          <h3>Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="value" fill="#8884d8">
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Pie Chart */}
        {categoryData.length > 0 && (
          <div className="chart-wrapper">
            <h3>Expense by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
