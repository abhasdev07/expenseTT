# Quick Start Guide

## Current Status
✅ MySQL Database: **RUNNING**  
✅ Backend Server: **RUNNING** (Port 5000)  
✅ Frontend Server: **RUNNING** (Port 3000)  

## Problem
You're seeing "Authorization token required" because **you're not logged in**.

## Solution

### Step 1: Register a New Account
1. Open your browser and go to: `http://localhost:3000/register`
2. Enter your email and password
3. Click "Register"
4. You'll be automatically logged in and redirected to the dashboard

### Step 2: If You Already Have an Account
1. Go to: `http://localhost:3000/login`
2. Enter your credentials
3. Click "Login"

### Step 3: Test the Application
After logging in, you should be able to:
- View the dashboard
- Add transactions (categories will load properly)
- Create budgets
- Set goals
- View analytics

## Troubleshooting

### If Login Doesn't Work
1. Check the browser console (F12) for errors
2. Make sure both servers are running:
   - Backend: `http://localhost:5000/api/v1/health` should return "healthy"
   - Frontend: `http://localhost:3000` should load

### If You See "Authorization token required"
This means you're not logged in. Go back to Step 1 or Step 2.

### Database Connection
Your database is configured with:
- Host: localhost
- Database: expense_tracker
- User: abhas
- Password: 123

Make sure MySQL service is running (it currently is).

## API Endpoints

All API endpoints require authentication except:
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login
- GET `/api/v1/health` - Health check

Protected endpoints (require login):
- GET `/api/v1/categories` - Get categories
- GET `/api/v1/transactions` - Get transactions
- GET `/api/v1/budgets` - Get budgets
- GET `/api/v1/goals` - Get goals
- GET `/api/v1/analytics/*` - Analytics endpoints

## Next Steps

Once logged in:
1. **Categories** are automatically created when you register
2. Go to **Transactions** page
3. Click "Add Transaction"
4. Select a category (they should load now!)
5. Fill in the details and click "Create"

Your transaction will be saved and displayed!
