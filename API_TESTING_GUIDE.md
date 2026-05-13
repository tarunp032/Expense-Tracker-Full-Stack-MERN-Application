# 🚀 FinTrack Pro API Documentation - Thunder Client Testing Guide

## Base URL

```
http://localhost:5000/api
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1️⃣ **Signup** (Create Account)

**POST** `/auth/signup`

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phoneNumber": "9876543210",
  "dateOfBirth": "1990-05-15",
  "gender": "Male",
  "profession": "Software Engineer",
  "address": "123 Main St, City, Country",
  "profileImage": "https://example.com/image.jpg"
}
```

**Expected Response (201):**

```json
{
  "message": "User registered successfully. Please login to continue.",
  "userId": "user_id_here"
}
```

**Error Response (400):**

```json
{
  "message": "User already exists with this email"
}
```

---

### 2️⃣ **Login** (Request OTP)

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**

```json
{
  "message": "OTP sent to your email. Please verify to login.",
  "userId": "user_id_here",
  "email": "john@example.com"
}
```

**Check your email for OTP code!**

---

### 3️⃣ **Verify OTP** (Get JWT Token)

**POST** `/auth/verify-otp`

**Request Body:**

```json
{
  "userId": "user_id_from_login",
  "otp": "123456"
}
```

**Expected Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210"
  }
}
```

**Save the token! You'll use it for all protected endpoints.**

---

### 4️⃣ **Get Profile** (View User Info)

**GET** `/auth/profile`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "User profile fetched successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "gender": "Male",
    "profession": "Software Engineer",
    "address": "123 Main St, City, Country",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2024-05-12T10:30:00.000Z",
    "updatedAt": "2024-05-12T10:30:00.000Z"
  }
}
```

---

### 5️⃣ **Update Profile**

**PUT** `/auth/profile`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "fullName": "John Doe Updated",
  "phoneNumber": "9876543211",
  "profession": "Senior Engineer",
  "address": "456 Oak Ave, City, Country"
}
```

**Expected Response (200):**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "fullName": "John Doe Updated",
    "phoneNumber": "9876543211",
    "profession": "Senior Engineer",
    "address": "456 Oak Ave, City, Country"
  }
}
```

---

### 6️⃣ **Logout**

**POST** `/auth/logout`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

---

## 💰 TRANSACTION ENDPOINTS (All Protected)

### 1️⃣ **Add Transaction**

**POST** `/transactions`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "amount": 5000,
  "type": "expense",
  "category": "Food",
  "description": "Lunch at restaurant",
  "paymentMethod": "credit_card",
  "status": "completed",
  "tags": ["dining", "food"]
}
```

**Expected Response (201):**

```json
{
  "message": "Transaction added successfully",
  "data": {
    "_id": "transaction_id",
    "userId": "user_id",
    "amount": 5000,
    "type": "expense",
    "category": "Food",
    "description": "Lunch at restaurant",
    "paymentMethod": "credit_card",
    "status": "completed",
    "tags": ["dining", "food"],
    "date": "2024-05-12T10:30:00.000Z",
    "createdAt": "2024-05-12T10:30:00.000Z",
    "updatedAt": "2024-05-12T10:30:00.000Z"
  }
}
```

---

### 2️⃣ **Get All Transactions**

**GET** `/transactions`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "_id": "transaction_id_1",
      "userId": "user_id",
      "amount": 5000,
      "type": "expense",
      "category": "Food",
      "date": "2024-05-12T10:30:00.000Z"
    },
    {
      "_id": "transaction_id_2",
      "userId": "user_id",
      "amount": 50000,
      "type": "income",
      "category": "Salary",
      "date": "2024-05-10T10:30:00.000Z"
    }
  ]
}
```

---

### 3️⃣ **Get Transaction by ID**

**GET** `/transactions/:id`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**

```
GET /transactions/64f5a1b2c3d4e5f6g7h8i9j0
```

**Expected Response (200):**

```json
{
  "message": "Transaction retrieved successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "userId": "user_id",
    "amount": 5000,
    "type": "expense",
    "category": "Food",
    "description": "Lunch at restaurant",
    "paymentMethod": "credit_card",
    "status": "completed",
    "tags": ["dining"]
  }
}
```

---

### 4️⃣ **Update Transaction**

**PUT** `/transactions/:id`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "amount": 6000,
  "category": "Restaurant",
  "description": "Dinner at premium restaurant"
}
```

**Expected Response (200):**

```json
{
  "message": "Transaction updated successfully",
  "data": {
    "amount": 6000,
    "category": "Restaurant",
    "description": "Dinner at premium restaurant"
  }
}
```

---

### 5️⃣ **Delete Transaction**

**DELETE** `/transactions/:id`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "Transaction deleted successfully",
  "data": {
    "_id": "transaction_id",
    "amount": 5000,
    "type": "expense"
  }
}
```

---

### 6️⃣ **Get Summary (Income, Expense, Balance)**

**GET** `/transactions/summary`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "Summary retrieved successfully",
  "data": {
    "totalIncome": 150000,
    "totalExpense": 45000,
    "balance": 105000,
    "totalTransactions": 25
  }
}
```

---

## 🧪 TESTING WORKFLOW IN THUNDER CLIENT

### Step 1: Signup

1. Create new request → **POST**
2. URL: `http://localhost:5000/api/auth/signup`
3. Body → JSON → Paste signup request
4. Send → Should get success (201)

### Step 2: Login

1. Create new request → **POST**
2. URL: `http://localhost:5000/api/auth/login`
3. Body → JSON → Paste login request
4. Send → Get userId
5. **Check your email for OTP code!**

### Step 3: Verify OTP

1. Create new request → **POST**
2. URL: `http://localhost:5000/api/auth/verify-otp`
3. Body → JSON → Paste OTP request with code from email
4. Send → Get JWT token
5. **Copy the entire token value**

### Step 4: Add Headers for Protected Routes

For all remaining requests:

1. Go to **Headers** tab
2. Add new header:
   - Key: `Authorization`
   - Value: `Bearer PASTE_YOUR_TOKEN_HERE`

### Step 5: Test Protected Endpoints

- Get Profile
- Add Transaction
- Get Transactions
- Get Summary
- Update Profile

---

## 🔧 COMMON ERRORS & FIXES

| Error                | Cause                | Fix                       |
| -------------------- | -------------------- | ------------------------- |
| 400 Validation Error | Missing fields       | Check all required fields |
| 401 No token         | Missing header       | Add Authorization header  |
| 401 Invalid token    | Wrong token          | Copy token correctly      |
| 401 Token expired    | 7 days passed        | Login again               |
| 404 Not found        | Wrong transaction ID | Use correct ID            |
| 500 Server error     | Check console        | Verify MongoDB running    |

---

## 📝 THUNDER CLIENT COLLECTION SETUP

1. **Create Collection**: `FinTrack Pro APIs`
2. **Create Folders**:
   - Auth (Signup, Login, Verify OTP, Profile)
   - Transactions (Add, Get, Update, Delete, Summary)
3. **Set Base URL**: Use environment variable
   - Variable: `baseUrl`
   - Value: `http://localhost:5000/api`
4. **Set Token**: Use for protected routes
   - Variable: `token`
   - Update after verify-otp response

---

## ✅ VERIFICATION CHECKLIST

After testing all endpoints:

- ✅ Signup works → User created in DB
- ✅ Login works → OTP sent to email
- ✅ OTP verification works → JWT token received
- ✅ Profile accessible → Shows user data
- ✅ Add transaction works → Data saved
- ✅ Get transactions works → Shows only user's data
- ✅ Update transaction works → Data updated
- ✅ Delete transaction works → Data removed
- ✅ Get summary works → Correct calculations
- ✅ Logout works → Session ended
- ✅ All endpoints protected → 401 without token

---

**🎉 All APIs working successfully!**
