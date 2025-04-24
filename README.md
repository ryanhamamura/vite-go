# Frontend/Backend Integration Project

This project demonstrates how to serve a React/TypeScript frontend built with Vite from a Go backend using the `go:embed` directive, with a structured backend using the container pattern.

## Project Structure

- `frontend/`: React TypeScript application built with Vite
- `backend/`: Go backend server that serves the static files
  - `pkg/`: Package directory for Go components
    - `container/`: Application container for dependency injection
    - `handlers/`: HTTP handlers and router (using go-chi)
    - `server/`: HTTP server implementation
    - `config/`: Application configuration
    - `repositories/`: (Future) Data access layer
    - `services/`: (Future) Business logic layer
- `backend/dist/`: (Generated) Build output from the frontend

## Recent Changes

- Implemented container pattern for the Go backend
  - Added go-chi for HTTP routing
  - Structured code with handlers, server, and container packages
  - Improved separation of concerns
- Changed frontend build output from static/ to dist/
- Fixed TypeScript build configuration for Vite
  - Added Node.js type definitions to support path resolution in vite.config.ts
  - Installed @types/node package
- Initialized Git repository with appropriate .gitignore for both frontend and backend
- Updated server port to 8180

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

Visit `http://localhost:8180` to see the app.

## How It Works

The Go backend uses the `embed` package to include the static files from the frontend build. The key part is:

```go
//go:embed dist
var staticFiles embed.FS

func main() {
    // Create application container
    app := container.New(staticFiles)
    
    // Initialize router with handlers
    app.InitializeRouter(handlers.NewRouter)
    
    // Create and start server
    srv := server.New(app.Router)
    if err := srv.Start(); err != nil {
        log.Fatal(err)
    }
}
```

Inside the handlers package, the static files are served using:

```go
// Setup static file serving
fsys, err := fs.Sub(staticFiles, "dist")
if err != nil {
    panic(err)
}

// Static files route
r.Handle("/*", http.FileServer(http.FS(fsys)))
```

The container pattern allows for better separation of concerns and easier testing by using dependency injection to wire up the components. This structure also makes it easier to add new functionality as the application grows.