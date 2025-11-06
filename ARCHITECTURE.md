# 🏗️ Architecture Documentation

## System Overview

The Expense Tracker is built using a modern **client-server architecture** with clear separation of concerns between the frontend and backend.

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React SPA (Port 3000)                     │   │
│  │  - Components, Pages, Context                       │   │
│  │  - TailwindCSS for styling                          │   │
│  │  - React Router for navigation                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Flask REST API (Port 5000)                  │   │
│  │  - Blueprint-based modular structure                │   │
│  │  - JWT authentication                               │   │
│  │  - Marshmallow validation                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQL
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MySQL Database                         │   │
│  │  - SQLAlchemy ORM                                   │   │
│  │  - Relational data model                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture (Flask)

### Directory Structure

```
backend/
├── app/
│   ├── __init__.py           # App factory, extensions
│   ├── config.py             # Configuration classes
│   ├── models.py             # Database models
│   ├── schemas.py            # Marshmallow schemas
│   ├── auth/                 # Authentication blueprint
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── transactions/         # Transactions blueprint
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── budgets/              # Budgets blueprint
│   ├── analytics/            # Analytics blueprint
│   ├── goals/                # Goals blueprint
│   ├── categories/           # Categories blueprint
│   └── groups/               # Groups blueprint
├── migrations/               # Database migrations
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
└── run.py                    # Application entry point
```

### Key Design Patterns

#### 1. Blueprint Pattern
Each feature module is organized as a Flask Blueprint for modularity:
- **auth**: User registration, login, profile management
- **transactions**: CRUD operations for income/expenses
- **budgets**: Budget management and tracking
- **analytics**: Data aggregation and insights
- **goals**: Savings goals tracking
- **categories**: Category management
- **groups**: Shared expense groups

#### 2. Repository Pattern (via SQLAlchemy ORM)
Database operations are abstracted through SQLAlchemy models, providing:
- Type safety
- Query building
- Relationship management
- Transaction handling

#### 3. DTO Pattern (via Marshmallow)
Data Transfer Objects for validation and serialization:
- Input validation
- Output serialization
- Type conversion
- Error handling

### Authentication Flow

```
1. User Login
   ↓
2. Backend validates credentials
   ↓
3. Generate JWT tokens (access + refresh)
   ↓
4. Return tokens to client
   ↓
5. Client stores tokens
   ↓
6. Client includes access token in Authorization header
   ↓
7. Backend validates token on each request
   ↓
8. If expired, use refresh token to get new access token
```

### Database Schema

#### Core Tables

**users**
- Primary user account information
- Theme preferences
- Authentication data (hashed passwords)

**categories**
- User-defined income/expense categories
- Icons and colors for UI
- Type classification (income/expense)

**transactions**
- Individual financial transactions
- Links to categories and users
- Support for recurring transactions
- Optional group association

**budgets**
- Monthly/weekly spending limits per category
- Period-based tracking

**savings_goals**
- Target amounts and deadlines
- Progress tracking
- Status management

**groups & group_members**
- Shared expense groups
- Member management with roles
- Bill splitting functionality

### API Design Principles

1. **RESTful Endpoints**: Standard HTTP methods (GET, POST, PUT, DELETE)
2. **Versioned API**: `/api/v1/` prefix for future compatibility
3. **Consistent Response Format**: JSON with standard structure
4. **Error Handling**: Proper HTTP status codes and error messages
5. **Pagination**: Large datasets paginated with metadata
6. **Filtering**: Query parameters for filtering and sorting

## Frontend Architecture (React)

### Directory Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.js
│   │   └── LoadingSpinner.js
│   ├── pages/               # Page components
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── TransactionsPage.js
│   │   └── ...
│   ├── context/             # React Context providers
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── services/            # API service layer
│   │   └── api.js
│   ├── utils/               # Utility functions
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
└── .env
```

### State Management Strategy

#### 1. React Context API
Used for global state that needs to be accessed across components:
- **AuthContext**: User authentication state, login/logout methods
- **ThemeContext**: Dark/light theme preference

#### 2. Local Component State
Used for component-specific state:
- Form inputs
- UI toggles
- Loading states

#### 3. Server State
Data fetched from API is managed at the component level:
- Fetch on mount with `useEffect`
- Loading and error states
- Optimistic updates for better UX

### Routing Structure

```
/ (root)
├── /login              # Public route
├── /register           # Public route
└── / (authenticated)   # Protected routes
    ├── /dashboard      # Overview and stats
    ├── /transactions   # Transaction list and management
    ├── /budgets        # Budget management
    ├── /goals          # Savings goals
    ├── /categories     # Category management
    ├── /analytics      # Reports and charts
    └── /settings       # User settings
```

### Component Hierarchy

```
App
├── AuthProvider
│   └── ThemeProvider
│       ├── Router
│       │   ├── PublicRoute (Login, Register)
│       │   └── ProtectedRoute
│       │       └── Layout
│       │           ├── Sidebar
│       │           ├── Navbar
│       │           └── Outlet (Page Content)
│       └── Toaster (Notifications)
```

### Styling Approach

1. **TailwindCSS**: Utility-first CSS framework
2. **CSS Variables**: Theme colors defined in `:root` and `[data-theme="dark"]`
3. **Responsive Design**: Mobile-first approach with breakpoints
4. **Dark Mode**: Toggle between light/dark themes with smooth transitions

## Data Flow Examples

### Creating a Transaction

```
User fills form
    ↓
Form validation (client-side)
    ↓
POST /api/v1/transactions
    ↓
JWT validation (backend)
    ↓
Schema validation (Marshmallow)
    ↓
Business logic checks
    ↓
Save to database (SQLAlchemy)
    ↓
Return transaction object
    ↓
Update UI (React state)
    ↓
Show success notification
```

### Dashboard Data Loading

```
Component mounts
    ↓
Parallel API calls:
  - GET /api/v1/analytics/summary
  - GET /api/v1/analytics/spending-by-category
  - GET /api/v1/budgets
    ↓
Backend aggregates data (SQL queries)
    ↓
Return JSON responses
    ↓
Update component state
    ↓
Render charts and stats
```

## Security Considerations

1. **Authentication**: JWT-based with access and refresh tokens
2. **Password Hashing**: bcrypt with salt
3. **SQL Injection Prevention**: SQLAlchemy ORM parameterized queries
4. **XSS Protection**: React auto-escapes output
5. **CORS**: Configured to allow only frontend origin
6. **Input Validation**: Both client and server-side
7. **HTTPS**: Required in production

## Performance Optimizations

1. **Database Indexing**: On frequently queried columns (user_id, date, category_id)
2. **Pagination**: Large datasets split into pages
3. **Lazy Loading**: Components loaded on demand
4. **Caching**: Browser caching for static assets
5. **Optimistic Updates**: UI updates before server confirmation
6. **SQL Query Optimization**: Using aggregations and joins efficiently

## Scalability Considerations

1. **Stateless API**: Easy horizontal scaling
2. **Database Connection Pooling**: SQLAlchemy manages connections
3. **CDN for Static Assets**: Frontend build can be served via CDN
4. **Microservices Ready**: Blueprint structure allows easy service extraction
5. **Caching Layer**: Redis can be added for session/data caching

## Testing Strategy

### Backend Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Database migration tests

### Frontend Testing
- Component unit tests (Jest + React Testing Library)
- Integration tests for user flows
- E2E tests (Cypress/Playwright)

## Deployment Architecture

### Development
- Backend: Flask development server (port 5000)
- Frontend: React development server (port 3000)
- Database: Local MySQL instance

### Production
- Backend: Gunicorn + nginx reverse proxy
- Frontend: Static build served via nginx/CDN
- Database: Managed MySQL (AWS RDS, Azure Database, etc.)
- SSL/TLS: Let's Encrypt certificates

## Future Enhancements

1. **Caching Layer**: Redis for session management
2. **Message Queue**: Celery for async tasks (recurring transactions)
3. **File Storage**: S3/Azure Blob for receipts/attachments
4. **Real-time Updates**: WebSockets for live notifications
5. **Mobile App**: React Native using same API
6. **Data Export**: Background jobs for CSV/PDF generation
7. **Email Notifications**: Budget alerts and reminders
8. **Multi-currency Support**: Exchange rate API integration
