# 📡 API Usage Examples

This document provides practical examples of how to use the Expense Tracker API.

## Base URL

```
http://localhost:5000/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication Endpoints

### Register New User

**POST** `/auth/register`

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "user",
    "email": "user@example.com",
    "theme_preference": "light",
    "created_at": "2025-11-06T10:00:00"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Login

**POST** `/auth/login`

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### Get User Profile

**GET** `/auth/profile`

```bash
curl -X GET http://localhost:5000/api/v1/auth/profile \
  -H "Authorization: Bearer <access_token>"
```

### Update Theme

**PUT** `/auth/profile/theme`

```bash
curl -X PUT http://localhost:5000/api/v1/auth/profile/theme \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "dark"
  }'
```

---

## 📁 Categories

### Create Category

**POST** `/categories`

```bash
curl -X POST http://localhost:5000/api/v1/categories \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Food & Dining",
    "type": "expense",
    "icon": "utensils",
    "color": "#ef4444"
  }'
```

**Response:**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 1,
    "name": "Food & Dining",
    "type": "expense",
    "icon": "utensils",
    "color": "#ef4444",
    "created_at": "2025-11-06T10:00:00"
  }
}
```

### Get All Categories

**GET** `/categories?type=expense`

```bash
curl -X GET "http://localhost:5000/api/v1/categories?type=expense" \
  -H "Authorization: Bearer <access_token>"
```

### Update Category

**PUT** `/categories/{id}`

```bash
curl -X PUT http://localhost:5000/api/v1/categories/1 \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Restaurants",
    "color": "#f59e0b"
  }'
```

### Delete Category

**DELETE** `/categories/{id}`

```bash
curl -X DELETE http://localhost:5000/api/v1/categories/1 \
  -H "Authorization: Bearer <access_token>"
```

---

## 💰 Transactions

### Create Transaction

**POST** `/transactions`

```bash
curl -X POST http://localhost:5000/api/v1/transactions \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "category_id": 1,
    "amount": "1250.50",
    "type": "expense",
    "description": "Lunch at restaurant",
    "date": "2025-11-06T14:30:00"
  }'
```

**Response:**
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": 1,
    "category_id": 1,
    "amount": "1250.50",
    "type": "expense",
    "description": "Lunch at restaurant",
    "date": "2025-11-06T14:30:00",
    "is_recurring": false,
    "created_at": "2025-11-06T14:30:00",
    "category": {
      "id": 1,
      "name": "Food & Dining",
      "icon": "utensils",
      "color": "#ef4444"
    }
  }
}
```

### Get Transactions with Filters

**GET** `/transactions`

```bash
# Get all transactions for current month
curl -X GET "http://localhost:5000/api/v1/transactions?month=11&year=2025" \
  -H "Authorization: Bearer <access_token>"

# Get expense transactions only
curl -X GET "http://localhost:5000/api/v1/transactions?type=expense" \
  -H "Authorization: Bearer <access_token>"

# Get transactions for specific category
curl -X GET "http://localhost:5000/api/v1/transactions?category_id=1" \
  -H "Authorization: Bearer <access_token>"

# Search transactions
curl -X GET "http://localhost:5000/api/v1/transactions?search=lunch" \
  -H "Authorization: Bearer <access_token>"

# Pagination
curl -X GET "http://localhost:5000/api/v1/transactions?page=1&per_page=20" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "transactions": [...],
  "total": 45,
  "page": 1,
  "per_page": 20,
  "pages": 3
}
```

### Create Recurring Transaction

**POST** `/transactions`

```bash
curl -X POST http://localhost:5000/api/v1/transactions \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "category_id": 2,
    "amount": "15000.00",
    "type": "income",
    "description": "Monthly salary",
    "date": "2025-11-01T00:00:00",
    "is_recurring": true,
    "recurring_frequency": "monthly",
    "recurring_end_date": "2026-11-01T00:00:00"
  }'
```

### Update Transaction

**PUT** `/transactions/{id}`

```bash
curl -X PUT http://localhost:5000/api/v1/transactions/1 \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "1500.00",
    "description": "Updated lunch expense"
  }'
```

### Delete Transaction

**DELETE** `/transactions/{id}`

```bash
curl -X DELETE http://localhost:5000/api/v1/transactions/1 \
  -H "Authorization: Bearer <access_token>"
```

### Get Calendar View

**GET** `/transactions/calendar?month=11&year=2025`

```bash
curl -X GET "http://localhost:5000/api/v1/transactions/calendar?month=11&year=2025" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "calendar": {
    "2025-11-01": [
      { "id": 1, "amount": "1250.50", "type": "expense", ... }
    ],
    "2025-11-06": [
      { "id": 2, "amount": "500.00", "type": "expense", ... },
      { "id": 3, "amount": "15000.00", "type": "income", ... }
    ]
  },
  "month": 11,
  "year": 2025
}
```

---

## 💵 Budgets

### Create Budget

**POST** `/budgets`

```bash
curl -X POST http://localhost:5000/api/v1/budgets \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "category_id": 1,
    "amount": "5000.00",
    "period": "monthly",
    "month": 11,
    "year": 2025
  }'
```

**Response:**
```json
{
  "message": "Budget created successfully",
  "budget": {
    "id": 1,
    "category_id": 1,
    "amount": "5000.00",
    "period": "monthly",
    "month": 11,
    "year": 2025,
    "category": {
      "id": 1,
      "name": "Food & Dining"
    }
  }
}
```

### Get Budgets with Progress

**GET** `/budgets?month=11&year=2025`

```bash
curl -X GET "http://localhost:5000/api/v1/budgets?month=11&year=2025" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "budgets": [
    {
      "id": 1,
      "category_id": 1,
      "amount": "5000.00",
      "spent": "3250.50",
      "remaining": "1749.50",
      "percentage": 65.01,
      "category": {
        "id": 1,
        "name": "Food & Dining",
        "color": "#ef4444"
      }
    }
  ]
}
```

---

## 📊 Analytics

### Get Financial Summary

**GET** `/analytics/summary?month=11&year=2025`

```bash
curl -X GET "http://localhost:5000/api/v1/analytics/summary?month=11&year=2025" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "total_income": "50000.00",
  "total_expense": "35000.00",
  "net_balance": "15000.00",
  "transaction_count": 45,
  "income_count": 5,
  "expense_count": 40,
  "period": "2025-11"
}
```

### Get Spending by Category

**GET** `/analytics/spending-by-category?month=11&year=2025&type=expense`

```bash
curl -X GET "http://localhost:5000/api/v1/analytics/spending-by-category?month=11&year=2025&type=expense" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "spending": [
    {
      "category_id": 1,
      "category_name": "Food & Dining",
      "category_icon": "utensils",
      "category_color": "#ef4444",
      "total_amount": "12500.00",
      "transaction_count": 25,
      "percentage": 35.71
    },
    {
      "category_id": 2,
      "category_name": "Transportation",
      "total_amount": "8000.00",
      "transaction_count": 10,
      "percentage": 22.86
    }
  ],
  "total": "35000.00",
  "type": "expense"
}
```

### Get Trends

**GET** `/analytics/trends?period=monthly&months=6`

```bash
curl -X GET "http://localhost:5000/api/v1/analytics/trends?period=monthly&months=6" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "trends": [
    {
      "date": "2025-06",
      "income": "48000.00",
      "expense": "32000.00",
      "net": "16000.00"
    },
    {
      "date": "2025-07",
      "income": "50000.00",
      "expense": "35000.00",
      "net": "15000.00"
    }
  ],
  "period": "monthly"
}
```

### Get Smart Insights

**GET** `/analytics/insights`

```bash
curl -X GET http://localhost:5000/api/v1/analytics/insights \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "insights": [
    {
      "type": "spending_change",
      "title": "Spending Pattern Change",
      "message": "You've spent 15.5% more this month compared to last month",
      "severity": "warning",
      "data": {
        "current": "35000.00",
        "previous": "30000.00",
        "change_percent": 15.5
      }
    },
    {
      "type": "budget_alert",
      "title": "Budget Alert",
      "message": "You've used 95% of your Food & Dining budget",
      "severity": "error",
      "data": {
        "category": "Food & Dining",
        "spent": "4750.00",
        "budget": "5000.00",
        "percentage": 95.0
      }
    }
  ]
}
```

---

## 🎯 Savings Goals

### Create Goal

**POST** `/goals`

```bash
curl -X POST http://localhost:5000/api/v1/goals \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vacation Fund",
    "target_amount": "100000.00",
    "current_amount": "25000.00",
    "target_date": "2026-06-01",
    "icon": "plane",
    "color": "#10b981"
  }'
```

### Get All Goals

**GET** `/goals?status=active`

```bash
curl -X GET "http://localhost:5000/api/v1/goals?status=active" \
  -H "Authorization: Bearer <access_token>"
```

**Response:**
```json
{
  "goals": [
    {
      "id": 1,
      "name": "Vacation Fund",
      "target_amount": "100000.00",
      "current_amount": "25000.00",
      "target_date": "2026-06-01",
      "icon": "plane",
      "color": "#10b981",
      "status": "active",
      "progress_percentage": 25.0,
      "remaining_amount": "75000.00"
    }
  ]
}
```

### Add Contribution

**POST** `/goals/{id}/contribute`

```bash
curl -X POST http://localhost:5000/api/v1/goals/1/contribute \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "5000.00"
  }'
```

---

## 👥 Groups (Shared Expenses)

### Create Group

**POST** `/groups`

```bash
curl -X POST http://localhost:5000/api/v1/groups \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Roommates",
    "description": "Shared apartment expenses"
  }'
```

### Add Member to Group

**POST** `/groups/{id}/members`

```bash
curl -X POST http://localhost:5000/api/v1/groups/1/members \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "roommate@example.com",
    "role": "member"
  }'
```

### Get Group Members

**GET** `/groups/{id}/members`

```bash
curl -X GET http://localhost:5000/api/v1/groups/1/members \
  -H "Authorization: Bearer <access_token>"
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### Common HTTP Status Codes

- **200 OK**: Successful GET/PUT request
- **201 Created**: Successful POST request
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding rate limiting to prevent abuse.

## Pagination

For endpoints that return lists, use these query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20, max: 100)

---

**Happy API Testing! 🚀**
