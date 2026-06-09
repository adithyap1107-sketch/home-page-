# ShareIndia — Fractional Ownership Platform

India's premier fractional asset ownership hub. This repo contains the **frontend** (5 store pages + homepage) and the **backend** (Node.js + Express + PostgreSQL REST API).

---

## Project Structure

```
shareindia/
│
├── frontend/                   # All HTML pages
│   ├── index.html              # Homepage (renamed from home_page_.html)
│   ├── agrishare.html
│   ├── brickshare.html
│   ├── luxshare.html
│   ├── daily-rentals.html
│   └── truckshare.html
│
└── shareindia-backend/         # Node.js + Express backend
    ├── server.js               # App entry point
    ├── package.json
    ├── .env.example            # Environment variable template
    ├── .gitignore
    ├── db/
    │   ├── pool.js             # PostgreSQL connection pool
    │   └── schema.sql          # Table creation + seed data
    └── routes/
        └── assets.js           # All /api/assets endpoints
```

---

## Backend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher

### 1. Clone and install

```bash
git clone https://github.com/adithyap1107-sketch/shareindia.git
cd shareindia/shareindia-backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in your PostgreSQL credentials:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=shareindia
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_SSL=false
```

### 3. Set up the database

Create the database in PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE shareindia;"
```

Run the schema (creates table + inserts sample data):

```bash
psql -U postgres -d shareindia -f db/schema.sql
```

### 4. Run the server

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:3000`

---

## API Reference

Base URL: `http://localhost:3000/api`

### Health Check

```
GET /
```
```json
{ "status": "ShareIndia API is running" }
```

---

### Assets

#### Get all assets

```
GET /api/assets
```

#### Get assets by category

```
GET /api/assets?category=agrishare
```

Valid categories: `agrishare` | `brickshare` | `luxshare` | `dailyrentals` | `truckshare`

**Response:**
```json
{
  "count": 3,
  "assets": [
    {
      "id": 1,
      "title": "Kolar Gold Fields Farmland",
      "category": "agrishare",
      "description": "12-acre tomato and ragi cultivation land with drip irrigation.",
      "price_per_share": "5000.00",
      "total_shares": 200,
      "available_shares": 145,
      "location": "Kolar, Karnataka",
      "image_url": "...",
      "is_active": true,
      "created_at": "2026-06-09T00:00:00.000Z"
    }
  ]
}
```

---

#### Get a single asset

```
GET /api/assets/:id
```

**Example:** `GET /api/assets/1`

---

#### Add a new asset

```
POST /api/assets
Content-Type: application/json
```

**Request body:**
```json
{
  "title": "Coorg Coffee Estate",
  "category": "agrishare",
  "description": "15-acre Arabica coffee plantation in the hills of Coorg.",
  "price_per_share": 6000,
  "total_shares": 180,
  "available_shares": 180,
  "location": "Coorg, Karnataka",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:** `201 Created` with the created asset object.

---

#### Update available shares

```
PATCH /api/assets/:id
Content-Type: application/json
```

**Request body:**
```json
{ "available_shares": 140 }
```

Use this after a user purchases shares.

---

#### Deactivate (soft delete) an asset

```
DELETE /api/assets/:id
```

This does **not** permanently delete the record. It sets `is_active = false` so the listing disappears from the frontend without losing data.

---

## Frontend Deployment (GitHub Pages)

1. Rename `home_page_.html` → `index.html`
2. Rename files with spaces: `brick share.html` → `brickshare.html`, `daily rentals.html` → `daily-rentals.html`
3. Update matching `openStore()` calls in `index.html`
4. Push all HTML files to a GitHub repo
5. Go to **Settings → Pages → Branch: main → Save**

Live URL: `https://adithyap1107-sketch.github.io/shareindia/`

---

## Backend Deployment (Render — Free Tier)

1. Push the `shareindia-backend/` folder to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
5. Add environment variables under **Environment** tab (same as `.env`)
6. For the database, use [Render PostgreSQL](https://render.com/docs/databases) (free tier available) and set `DB_SSL=true`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, Tailwind CSS, Font Awesome |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM/Query | `pg` (node-postgres) |
| Dev Tools | nodemon, dotenv |

---

## Author

**Adithya P**  
B.E. Computer Science & Data Science  
East Point College of Engineering and Technology, Bengaluru  
GitHub: [@adithyap1107-sketch](https://github.com/adithyap1107-sketch)
