# Frontend/Backend Integration Project

This project demonstrates how to serve a React/TypeScript frontend built with Vite from a Go backend using the `go:embed` directive.

## Project Structure

- `frontend/`: React TypeScript application built with Vite
- `backend/`: Go backend server that serves the static files
- `backend/static/`: (Generated) Build output from the frontend

## Using the Makefile

The project includes a Makefile to simplify building and running:

```bash
# Build both frontend and backend
make

# Build just the frontend
make build-frontend

# Build just the backend
make build-backend

# Run the server
make run

# Clean build artifacts
make clean
```

## Manual Instructions

### Build the Frontend

```bash
cd frontend
npm install
npm run build
```

### Run the Backend

```bash
cd backend
go run main.go
```

Visit `http://localhost:8080` to see the app.