# 💰 Expense Tracker - Personal Finance Management

A full-stack web application for tracking income, expenses, budgets, and financial goals with advanced analytics and insights.

## 🚀 Features

### Core Features
- ✅ Secure user authentication (JWT-based)
- 💵 Income & expense tracking with categories
- 📊 Interactive dashboard with real-time statistics
- 🎨 Custom category management (icons & colors)
- 📝 Complete transaction history with search/filter
- 💰 Budget management with progress tracking

### Advanced Features
- 📈 Reports & analytics with charts
- 📅 Calendar view for transactions
- 🎯 Savings goals tracking
- 🤝 Group expenses & bill splitting
- 💡 Smart spending insights
- 🌓 Dark/Light theme toggle
- 📱 Responsive mobile design

## 🛠️ Tech Stack

### Backend
- **Framework:** Flask 3.0+
- **Database:** MySQL 8.0+
- **ORM:** SQLAlchemy
- **Authentication:** JWT (Flask-JWT-Extended)
- **Validation:** Marshmallow
- **Migrations:** Flask-Migrate

### Frontend
- **Framework:** React 18+
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Charts:** Chart.js / Recharts
- **Icons:** Lucide React
- **Styling:** TailwindCSS + CSS Variables

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── analytics/
│   │   ├── goals/
│   │   └── groups/
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- MySQL 8.0+

### Backend Setup

1. **Create virtual environment:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure environment:**
Create `.env` file in backend directory:
```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=mysql+pymysql://username:password@localhost/expense_tracker
CORS_ORIGINS=http://localhost:3000
```

4. **Initialize database:**
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

5. **Run backend:**
```bash
flask run
```
Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Configure environment:**
Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

3. **Run frontend:**
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 🔐 API Documentation

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update user profile

### Transactions
- `GET /api/v1/transactions` - Get all transactions
- `POST /api/v1/transactions` - Create transaction
- `GET /api/v1/transactions/:id` - Get transaction by ID
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Budgets
- `GET /api/v1/budgets` - Get all budgets
- `POST /api/v1/budgets` - Create budget
- `PUT /api/v1/budgets/:id` - Update budget
- `DELETE /api/v1/budgets/:id` - Delete budget

### Analytics
- `GET /api/v1/analytics/summary` - Get financial summary
- `GET /api/v1/analytics/spending-by-category` - Category breakdown
- `GET /api/v1/analytics/trends` - Spending trends over time
- `GET /api/v1/analytics/insights` - Smart insights

### Goals
- `GET /api/v1/goals` - Get all savings goals
- `POST /api/v1/goals` - Create goal
- `PUT /api/v1/goals/:id` - Update goal
- `DELETE /api/v1/goals/:id` - Delete goal

## 💡 Key Design Decisions

### Currency Handling
- Single currency: Indian Rupees (₹)
- All amounts stored as `DECIMAL(10, 2)` for precision
- Frontend formatting with proper INR symbols

### Authentication Flow
1. User logs in → receives JWT access token (15 min) + refresh token (30 days)
2. Access token stored in memory (React state)
3. Refresh token stored in httpOnly cookie
4. Automatic token refresh on expiry

### State Management
- **React Context** for global state (user, theme, auth)
- **Local state** for component-specific data
- **Optimistic updates** for better UX

### Theme System
- CSS variables for easy theming
- User preference saved in database
- Instant theme switching without page reload

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend (Production)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

### Frontend (Production)
```bash
npm run build
# Serve build folder with nginx or similar
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Flask documentation
- React documentation
- TailwindCSS
- Chart.js community

---

**Built with ❤️ for better financial management**
