# 📊 Expense Tracker - MERN Stack

A full-stack web application for managing income and expenses with CRUD operations, data visualization, and financial summaries.

## ✨ Features

- ✅ Add, edit, and delete transactions
- ✅ Categorize income and expenses
- ✅ View financial summaries (total income, expense, balance)
- ✅ Interactive charts and visualizations
- ✅ REST API with MongoDB integration
- ✅ Clean and responsive UI

## 🧱 Tech Stack

### Frontend

- React.js
- Axios
- React Router DOM
- Recharts
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── transactionController.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   └── ChartComponent.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── Dashboard.css
│   │   │   ├── TransactionForm.css
│   │   │   ├── TransactionList.css
│   │   │   └── ChartComponent.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)
- VS Code or any code editor
- Thunder Client or Postman (for API testing)

### Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with your MongoDB URI:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
NODE_ENV=development
```

4. Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Frontend will open on `http://localhost:3000`

## 📌 API Endpoints

### Add Transaction

```
POST /api/transactions
Body: {
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "description": "Lunch",
  "date": "2026-05-11"
}
```

### Get All Transactions

```
GET /api/transactions
```

### Get Transaction by ID

```
GET /api/transactions/:id
```

### Update Transaction

```
PUT /api/transactions/:id
Body: { ...updated fields }
```

### Delete Transaction

```
DELETE /api/transactions/:id
```

### Get Summary

```
GET /api/transactions/summary
Response: {
  "totalIncome": 5000,
  "totalExpense": 2000,
  "balance": 3000,
  "totalTransactions": 10
}
```

## 🔌 API Testing with Thunder Client

1. Create a new collection: **Expense Tracker APIs**
2. Add requests for all endpoints
3. Test each endpoint to verify functionality
4. Save requests for reuse

## 📊 Data Model

### Transaction Schema

```javascript
{
  _id: ObjectId,
  amount: Number (required),
  type: String (enum: ['income', 'expense'], required),
  category: String (required),
  description: String (required),
  date: Date (default: current date),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Interview Explanation

> "I built a full-stack Expense Tracker using the MERN stack.
>
> **Backend:** I used Express.js and MongoDB with Mongoose for database operations. The backend handles all CRUD operations (Create, Read, Update, Delete) for transactions and provides data aggregation for financial summaries.
>
> **Frontend:** I created a React application with reusable components for the transaction form, transaction list, and charts. I used Axios for API calls and Recharts for data visualization.
>
> **Features:** Users can add income and expense transactions, categorize them, view their financial summary with charts, and manage their transactions. I tested all APIs using Thunder Client to ensure they work correctly.
>
> **Architecture:** The project follows clean architecture with separation of concerns - controllers handle business logic, models define data structure, and routes define endpoints."

## 🧪 Testing

### Backend Testing

- Use Thunder Client or Postman
- Test all CRUD endpoints
- Verify error handling

### Frontend Testing

- Test form submission
- Verify data display
- Check chart rendering
- Test delete and update functions

## 📝 Example Transactions

**Income Transaction:**

```json
{
  "amount": 5000,
  "type": "income",
  "category": "Salary",
  "description": "Monthly salary",
  "date": "2026-05-11"
}
```

**Expense Transaction:**

```json
{
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "description": "Groceries",
  "date": "2026-05-11"
}
```

## 🔒 Environment Variables

Create `.env` file in backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

## 📈 Optional Enhancements

- [ ] User authentication (JWT)
- [ ] Filter transactions by date/month
- [ ] Pagination
- [ ] Dark mode UI
- [ ] Export transactions as CSV
- [ ] Monthly/yearly reports
- [ ] Budget tracking

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy tracking! 💰**
