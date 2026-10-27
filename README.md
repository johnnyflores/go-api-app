# Go + React Task App

A full-stack task management application built with Go, React, and MongoDB. The project combines a REST API powered by Go and Fiber with a modern, responsive frontend built using React, TypeScript, and Chakra UI.

The application uses MongoDB for data storage and Docker Compose to simplify development by running the backend and frontend services together.

## Tech Stack

- Backend: Go, Fiber
- Database: MongoDB
- Frontend: React, TypeScript, Vite
- UI: Chakra UI
- Data Fetching & State Management: TanStack React Query
- Containerization: Docker and Docker Compose

## Features

- Full-stack architecture with separate frontend and backend services.
- REST API built with Go and Fiber.
- MongoDB integration for data persistence.
- Modern frontend development with React and TypeScript.
- UI components powered by Chakra UI.
- Server-state management and data fetching with React Query.
- Docker Compose configuration for running services together.
- Development container configurations for streamlined development.

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

## License

This project was created as a personal portfolio project to demonstrate full-stack development skills, explore modern technologies, and support continuous learning and professional growth.
