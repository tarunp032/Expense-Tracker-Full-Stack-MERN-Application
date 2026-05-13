# 💎 FinTrack Pro - Premium MERN Expense Tracker

A production-ready expense tracking application with advanced authentication, user-specific data management, and premium UI/UX.

## 🌟 Features

### ✅ Advanced Authentication

- **User Registration**: Complete profile with 10 fields
- **Secure Login**: OTP-based email verification
- **Password Security**: Bcrypt hashing (10-salt rounds)
- **JWT Tokens**: 7-day expiration with automatic refresh
- **Email Verification**: Nodemailer integration with HTML templates

### ✅ User Management

- **Profile Management**: View and edit complete user profile
- **Data Privacy**: Each user sees only their own data
- **Profile Images**: Support for user profile pictures
- **Secure Sessions**: Token-based authentication

### ✅ Expense Tracking

- **Transaction CRUD**: Add, update, delete, view transactions
- **Smart Categorization**: Organize by category and payment method
- **Status Tracking**: Pending, completed, failed states
- **Tagging System**: Organize transactions with custom tags
- **Summary Analytics**: Real-time income, expense, and balance calculations

### ✅ Premium UI/UX

- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Professional fade-in, slide-up, hover effects
- **Modern Design**: Gradient backgrounds, card layouts, shadows
- **Intuitive Navigation**: Clean menu with dropdown profile options
- **Dark/Light Mode Ready**: Customizable color scheme

---

## 📋 Requirements Completed

| Feature                     | Status |
| --------------------------- | ------ |
| User Signup (10 fields)     | ✅     |
| Email OTP Verification      | ✅     |
| Secure Password Hashing     | ✅     |
| User Profile Management     | ✅     |
| Protected Routes            | ✅     |
| User-Specific Transactions  | ✅     |
| Transaction CRUD Operations | ✅     |
| Premium Navigation Bar      | ✅     |
| Professional UI/UX          | ✅     |
| Responsive Design           | ✅     |
| All API Endpoints           | ✅     |
| Error Handling              | ✅     |

---

## 🚀 Quick Start

### Prerequisites

- Node.js & npm installed
- MongoDB running (local or cloud)
- Gmail account (for OTP emails)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/fintrack-pro
NODE_ENV=development
JWT_SECRET=your_secure_secret_key_here
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EOF

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
# App opens on http://localhost:3000
```

---

## 🔐 Email Configuration

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication in Gmail
2. Generate App Password (16 characters)
3. Use App Password in `.env` EMAIL_PASS
4. **Do NOT use your regular password**

### Alternative Email Providers

Update `EMAIL_SERVICE` in `.env`:

- `gmail` - Gmail
- `outlook` - Outlook
- `yahoo` - Yahoo Mail
- Other providers supported by Nodemailer

---

## 📊 Project Structure

```
ExpenseTracker/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/      # Business logic (auth, transactions)
│   ├── middleware/       # Authentication & error handling
│   ├── models/          # User & Transaction schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Main server file
│   ├── package.json     # Dependencies
│   └── .env             # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── context/     # AuthContext for state management
│   │   ├── pages/       # Home, Login, Signup, Dashboard, Profile, VerifyOTP
│   │   ├── components/  # Navbar, ProtectedRoute, Forms, Lists
│   │   ├── services/    # API integration with axios
│   │   ├── styles/      # CSS files (premium styling)
│   │   ├── App.js       # Main router setup
│   │   └── index.js     # Entry point
│   ├── public/          # Static files
│   ├── package.json     # Dependencies
│   └── .env             # Frontend config
│
└── Documentation/
    ├── README.md                  # This file
    ├── IMPLEMENTATION_GUIDE.md    # Detailed implementation
    └── API_TESTING_GUIDE.md       # Thunder Client testing
```

---

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP & get token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/logout` - Logout (protected)

### Transactions (All Protected)

- `POST /api/transactions` - Add transaction
- `GET /api/transactions` - Get all user transactions
- `GET /api/transactions/:id` - Get specific transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary` - Get summary stats

---

## 🧪 Testing with Thunder Client

1. **Create Collection**: "FinTrack Pro APIs"
2. **Test Signup**: POST `/auth/signup`
3. **Test Login**: POST `/auth/login` (check email for OTP)
4. **Test OTP**: POST `/auth/verify-otp` (get JWT token)
5. **Add Header**: `Authorization: Bearer YOUR_TOKEN`
6. **Test Protected Routes**: All transaction endpoints

See [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md) for detailed examples.

---

## 🎨 UI/UX Features

### Design System

- **Color Scheme**: Purple gradient (#667eea → #764ba2)
- **Typography**: "Segoe UI" for modern look
- **Spacing**: Consistent 8px grid system
- **Shadows**: Soft shadows for depth
- **Border Radius**: 10-20px for modern feel

### Components

- **Navbar**: Sticky header with user profile
- **Cards**: Hover effects and animations
- **Forms**: Validation and error states
- **Buttons**: Gradient and interactive states
- **Responsive**: Mobile-first design approach

---

## 🔒 Security Features

✅ **Password Security**

- Bcrypt hashing with 10-salt rounds
- Never stored in plain text
- Validated during login

✅ **OTP Email Verification**

- 6-digit random code
- 10-minute expiration
- HTML email template
- Sent via Nodemailer

✅ **JWT Tokens**

- Generated after OTP verification
- 7-day expiration
- Verified on protected routes
- Automatic logout on expiration

✅ **Data Privacy**

- Users can only access own data
- UserID enforced in queries
- No cross-user data leakage

---

## 📱 Responsive Design

✅ Desktop (1200px+)
✅ Tablet (768px - 1199px)
✅ Mobile (< 768px)

Tested and optimized for:

- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Landscape and portrait orientations

---

## 📚 Documentation Files

1. **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete technical documentation
2. **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)** - Thunder Client testing examples
3. **[README.md](./README.md)** - This file

---

## 🛠️ Tech Stack

### Backend

- **Node.js** & **Express.js** - Server
- **MongoDB** & **Mongoose** - Database
- **Bcrypt** - Password hashing
- **JWT** - Token authentication
- **Nodemailer** - Email service

### Frontend

- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS3** - Styling & animations

---

## ✨ Key Highlights

### For Users

- 🎯 Easy to understand interface
- 🔒 Secure authentication
- 📊 Visual expense tracking
- 👤 Complete profile management
- 📱 Works on all devices

### For Developers

- 🏗️ Clean code structure
- 📖 Well-documented
- 🔐 Security best practices
- 🎨 Reusable components
- ⚡ Optimized performance
- 🧪 Easy to test
- 📈 Scalable architecture

### For Interviews

- ✅ Production-ready code
- ✅ Full-stack implementation
- ✅ Real-world features
- ✅ Professional UI/UX
- ✅ Security & authentication
- ✅ Database design
- ✅ API design patterns
- ✅ Error handling

---

## 🚦 Getting Help

### Common Issues

**MongoDB Connection Error**

- Ensure MongoDB is running
- Check MONGO_URI in .env
- Use connection string from MongoDB Atlas

**Email Not Sending**

- Verify Gmail app password (not regular password)
- Enable "Less secure app access" (if not using app password)
- Check EMAIL_USER and EMAIL_PASS in .env

**CORS Error**

- Backend CORS is configured
- Ensure backend is running on port 5000
- Check browser console for details

**Token Expired**

- Tokens expire in 7 days
- User needs to login again
- Frontend automatically redirects to login

---

## 📈 Future Enhancements

Potential features to add:

- Budget management & alerts
- Recurring transactions
- Export data (CSV, PDF)
- Multiple currencies
- Shared expense splitting
- Mobile app (React Native)
- Dark mode toggle
- Advanced analytics

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Created as a premium MERN application demonstrating:

- Full-stack development capabilities
- Production-ready code quality
- Professional UI/UX design
- Security best practices
- Real-world features

---

## 🎉 Ready to Use!

The application is fully functional and ready for:

- ✅ Development
- ✅ Testing
- ✅ Deployment
- ✅ Interview presentation
- ✅ Portfolio showcase

**Start exploring FinTrack Pro today!**

---

**Made with 💜 using MERN Stack**
