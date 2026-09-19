# Go + React Todo App

Full-stack todo application with:

- Go backend using Fiber and MongoDB
- React frontend using Vite, TypeScript, Chakra UI, and React Query

## Project Structure

```text
.
├── main.go              # Go API server
├── .env                 # Backend environment variables
├── air.toml             # Live-reload config for Go (optional)
└── frontend/            # React app
```

## Prerequisites

- Go 1.25+
- Node.js 20+ and npm
- MongoDB connection string (Atlas or local)

## Environment Variables

### Backend (.env in project root)

The backend reads variables from the root .env file when ENV is not production.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_PASSWORD=
ENV=development
```

Notes:

- MONGODB_URI is required.
- PORT defaults to 5000 if not set.

### Frontend (frontend/.env)

Create a frontend .env file:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend calls:

- GET VITE_API_URL + /todos
- POST VITE_API_URL + /todos
- PATCH VITE_API_URL + /todos/:id
- DELETE VITE_API_URL + /todos/:id

## Run Locally

### 1) Start backend

From the project root:

```bash
go run main.go
```

API will run at:

- http://localhost:5000

Optional live reload with Air (if installed):

```bash
air
```

### 2) Start frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

- http://localhost:5173

## Available Frontend Scripts

From frontend directory:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Endpoints

Base URL in development: http://localhost:5000/api

- GET /todos
- POST /todos
- PATCH /todos/:id
- DELETE /todos/:id

## Production Notes

- Build frontend first:

```bash
cd frontend
npm install
npm run build
```

- Start backend with ENV=production.
- In production mode, Fiber serves frontend static files from frontend/dist.

## Troubleshooting

- If frontend cannot reach API, verify frontend/.env has correct VITE_API_URL.
- If Mongo connection fails, verify MONGODB_URI and network access.
- CORS currently allows http://localhost:5173 in backend config.
