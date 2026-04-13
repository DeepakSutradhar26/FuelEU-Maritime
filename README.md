# FuelEU Maritime Compliance Dashboard

A full-stack implementation of the FuelEU Maritime compliance module built with React, TypeScript, Node.js, and PostgreSQL following Hexagonal Architecture.


## 🏗️ Architecture
This project follows **Hexagonal Architecture (Ports & Adapters)**:
```
core/          → Pure domain logic, no framework dependencies
ports/         → Interfaces connecting core to outside world
adapters/      → Implementations (HTTP controllers, DB repositories, React UI)
infrastructure/→ Express server, PostgreSQL connection
```

### Backend
```text
backend/src/
    core/
        domain/         → Route, ComplianceBalance, BankEntry, Pool
        application/
            usecases/     → ComputeCB,ComputeComparison,BankSurplus,ApplyBanked,CreatePool
            dtos/         → Data transfer objects
        ports/
            inbound/      → Use case interfaces
            outbound/     → Repository interfaces
    adapters/
        inbound/http/
            controllers/  → RouteController, ComplianceController, BankingController, PoolingController
            routes/       → Express route definitions
        outbound/postgres/ → PostgreSQL repository implementations
    infrastructure/
        db/             → Connection, migrations, seeds
        server/         → Express app setup
```

### Frontend
```
frontend/src/
    core/
        domain/         → Route, ComplianceBalance, BankEntry, Pool types
        application/    → Use case hooks
        ports/          → Service interfaces
    adapters/
        ui/
            components/   → React components (Routes, Compare, Banking, Pooling tabs)
            hooks/        → Custom React hooks
    infrastructure/
        api/          → Axios API clients
    shared/           → Constants, types, utilities
```

## Setup & Run

### Prerequisites
- Node.js v18+
- PostgreSQL 14+

### 1. Clone the repo
```bash
git clone https://github.com/DeepakSutradhar26/FuelEU-Maritime.git
```
### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:

Create database in PostgreSQL:
```bash
psql -U postgres -c "CREATE DATABASE fueleu_db;"
```

Run migrations and seed:
```bash
npm run migrate
npm run seed
```

Start backend:
```bash
npm run dev
```

Backend runs at: `http://localhost:3001`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
VITE_API_URL=http://localhost:3001

Start frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Running Tests

```bash
cd backend
npm test
```

Test coverage:
- Unit: ComputeCB, ComputeComparison, BankSurplus, ApplyBanked, CreatePool
- Integration: Routes, Compliance, Banking, Pooling endpoints
- Edge cases: Negative CB, over-apply bank, invalid pool

## 🔗 API Endpoints

### Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/routes` | Get all routes |
| POST | `/routes/:id/baseline` | Set route as baseline |
| GET | `/routes/comparison` | Compare baseline vs others |

### Compliance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/compliance/cb?shipId=R001&year=2024` | Compute compliance balance |
| GET | `/compliance/adjusted-cb?shipId=R001&year=2024` | Get adjusted CB with banking |

### Banking
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/banking/records?shipId=R001&year=2024` | Get banking records |
| POST | `/banking/bank` | Bank surplus CB |
| POST | `/banking/apply` | Apply banked surplus to deficit |

### Pooling
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/pools` | Create compliance pool |


## 📊 Sample API Requests

### Compute Compliance Balance
```bash
GET http://localhost:3001/compliance/cb?shipId=R002&year=2024

Response:
{
  "shipId": "R002",
  "year": 2024,
  "cbGco2eq": 263082240,
  "surplus": true
}
```

### Bank Surplus
```bash
POST http://localhost:3001/banking/bank
Content-Type: application/json
{ "shipId": "R002", "year": 2024 }

Response:
{
  "id": 1,
  "shipId": "R002",
  "year": 2024,
  "amountGco2eq": 263082240
}
```

### Create Pool
```bash
POST http://localhost:3001/pools
Content-Type: application/json
{
  "year": 2024,
  "members": [
    { "shipId": "R002", "year": 2024 },
    { "shipId": "R004", "year": 2025 }
  ]
}

Response:
{
  "poolId": 1,
  "year": 2024,
  "members": [
    { "shipId": "R002", "cbBefore": 263082240, "cbAfter": 263082240 },
    { "shipId": "R004", "cbBefore": 13688080, "cbAfter": 13688080 }
  ]
}
```

## 🧮 Core Formulas
Target Intensity = 89.3368 gCO₂e/MJ
Energy in Scope  = fuelConsumption × 41,000 MJ/t
Compliance Balance (CB) = (Target − Actual GHG) × Energy in Scope
Positive CB → Surplus
Negative CB → Deficit

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, TailwindCSS, Recharts |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| Testing | Jest, Supertest |
| Architecture | Hexagonal (Ports & Adapters) |