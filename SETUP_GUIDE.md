# 🚀 Complete Setup Guide - Expense Tracker

This guide will walk you through setting up the entire expense tracker application from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/downloads/)

## 🗄️ Database Setup

### 1. Install MySQL

If you haven't installed MySQL yet, download and install it from the official website.

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE expense_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create a user (optional but recommended)
CREATE USER 'expense_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON expense_tracker.* TO 'expense_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Verify Connection

Test your database connection:

```bash
mysql -u expense_user -p expense_tracker
```

## 🔧 Backend Setup (Flask)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-here-change-this
JWT_SECRET_KEY=your-jwt-secret-key-here-change-this
DATABASE_URL=mysql+pymysql://expense_user:your_secure_password@localhost/expense_tracker
CORS_ORIGINS=http://localhost:3000
```

**Important:** Generate secure secret keys:

```python
# Run in Python shell
import secrets
print(secrets.token_hex(32))  # For SECRET_KEY
print(secrets.token_hex(32))  # For JWT_SECRET_KEY
```

### 5. Initialize Database

```bash
# Initialize migrations
flask db init

# Create initial migration
flask db migrate -m "Initial migration"

# Apply migrations
flask db upgrade
```

### 6. (Optional) Create Default Categories

You can create a script to add default categories or add them manually through the API after starting the server.

### 7. Run Backend Server

```bash
flask run
```

The backend should now be running at `http://localhost:5000`

### 8. Test Backend

Open a browser or use curl:

```bash
curl http://localhost:5000/api/v1/health
```

You should see:
```json
{
  "status": "healthy",
  "currency": "INR",
  "currency_symbol": "₹"
}
```

## 🎨 Frontend Setup (React)

### 1. Navigate to Frontend Directory

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TailwindCSS, Axios, etc.

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

The default values should work if your backend is running on port 5000:

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_CURRENCY=INR
REACT_APP_CURRENCY_SYMBOL=₹
```

### 4. Run Frontend Development Server

```bash
npm start
```

The frontend should automatically open in your browser at `http://localhost:3000`

## ✅ Verify Installation

### 1. Register a New Account

- Navigate to `http://localhost:3000/register`
- Create a new account with email and password
- You should be automatically logged in and redirected to the dashboard

### 2. Test Basic Features

- **Dashboard**: Should display with 0 values initially
- **Theme Toggle**: Click the sun/moon icon to switch themes
- **Navigation**: Click through different pages in the sidebar

### 3. Create Your First Transaction

Once you've added categories, you can create transactions and see them reflected in the dashboard.

## 🔍 Troubleshooting

### Backend Issues

**Problem: `ModuleNotFoundError`**
```bash
# Ensure virtual environment is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Database Connection Error**
```bash
# Verify MySQL is running
# Windows: Check Services
# macOS: brew services list
# Linux: sudo systemctl status mysql

# Test connection
mysql -u expense_user -p expense_tracker
```

**Problem: Migration Errors**
```bash
# Remove migrations folder and reinitialize
rm -rf migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### Frontend Issues

**Problem: `npm install` fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Problem: TailwindCSS not working**
- The CSS warnings about `@tailwind` and `@apply` are expected
- These directives are processed during build time
- If styles aren't applying, restart the dev server: `npm start`

**Problem: API Connection Error**
- Verify backend is running on port 5000
- Check CORS settings in backend `.env`
- Verify `REACT_APP_API_URL` in frontend `.env`

## 🚀 Production Deployment

### Backend Production

1. **Update Configuration**:
```env
FLASK_ENV=production
```

2. **Use Production Server**:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

3. **Set Up Reverse Proxy** (nginx example):
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Frontend Production

1. **Build for Production**:
```bash
npm run build
```

2. **Serve Static Files** (nginx example):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/frontend/build;

    location / {
        try_files $uri /index.html;
    }
}
```

## 📚 Next Steps

1. **Add Default Categories**: Create income and expense categories
2. **Add Transactions**: Start tracking your income and expenses
3. **Set Budgets**: Create monthly budgets for different categories
4. **Create Goals**: Set savings goals to track progress
5. **Explore Analytics**: View spending patterns and insights

## 🤝 Need Help?

- Check the main `README.md` for API documentation
- Review the code comments for implementation details
- Ensure all environment variables are correctly set

---

**Happy Expense Tracking! 💰**
