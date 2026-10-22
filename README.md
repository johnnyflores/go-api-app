# Go + React Task App

Full-stack task app with:

- Go backend (Fiber + MongoDB)
- React frontend (Vite + TypeScript + Chakra UI + React Query)
- Docker Compose for running both services together

## Project Structure

```text
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile.dev
│   ├── air.toml
│   ├── main.go
│   ├── go.mod
│   └── .env
└── frontend/
    ├── Dockerfile.dev
    ├── package.json
    ├── vite.config.ts
    ├── .env
    └── src/
```

## Prerequisites

### For Docker workflow (recommended)

- Docker
- Docker Compose (v2)
- MongoDB connection string

### For local (without Docker)

- Go 1.25+
- Node.js 20+ and npm
- MongoDB connection string

## Environment Variables

### Backend env file

Create or update `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ENV=development
```

Notes:

- `docker-compose.yml` loads env from `backend/.env`.
- If `PORT` is not set, backend defaults to `5000`.

### Frontend env file

Create or update `frontend/.env`:

```env
VITE_API_URL=/api
```

Notes:

- In Docker Compose, Vite proxies `/api` to `backend:5000`.
- In local non-Docker mode, you can also use `VITE_API_URL=http://localhost:5000/api`.

## Run With Docker Compose

From project root:

```bash
docker compose up --build
```

App URLs:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

Useful commands:

```bash
# Start in detached mode
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes (useful when dependencies are stale)
docker compose down -v
```

## Run Locally (Without Docker)

### 1) Start backend

```bash
cd backend
go mod download
go run main.go
```

Optional live reload:

```bash
cd backend
air
```

### 2) Start frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

Base URL: `/api`

- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Troubleshooting

- Frontend import or dependency errors in Docker:

```bash
docker compose down -v
docker compose up --build
```

- API connection issues:
- Check `frontend/.env` (`VITE_API_URL`) for API connection issues.
- Check backend health/logs when API is unreachable: `docker compose logs -f backend`.

- MongoDB connection issues:
- Verify `MONGODB_URI` in `backend/.env`.
- Verify network/IP allowlist for MongoDB Atlas.
