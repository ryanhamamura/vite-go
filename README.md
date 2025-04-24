# Frontend/Backend Integration Project

This project demonstrates how to serve a React/TypeScript frontend built with Vite from a Go backend using the `go:embed` directive, with a structured backend using the container pattern.

## Project Structure

- `frontend/`: React TypeScript application built with Vite
  - `src/`: Source code for the React application
    - `components/`: Reusable UI components
    - `pages/`: Page components for different routes
  - `public/`: Static assets
- `backend/`: Go backend server that serves the static files
  - `pkg/`: Package directory for Go components
    - `container/`: Application container for dependency injection
    - `handlers/`: HTTP handlers and router (using go-chi)
    - `server/`: HTTP server implementation
    - `config/`: Application configuration
    - `repositories/`: (Future) Data access layer
    - `services/`: (Future) Business logic layer
- `backend/dist/`: (Generated) Build output from the frontend

## Features

### Frontend

- **React Router Navigation**: Multi-page application with clean URL paths
- **Product Pages**: Detailed information for each product offering
- **Security Classification Banners**: Dynamic banners that change based on page content
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dark/Light Mode Toggle**: User-selectable theme
- **ArmsVault Inventory Management**:
  - Dashboard overview with key metrics
  - Storage location management
  - Transaction tracking (gains, expenditures, transfers)
  - Reporting system

### Backend

- **Container Pattern**: Structured Go backend with dependency injection
- **Static File Serving**: Embedded frontend build in Go binary
- **API Routes**: (Future) RESTful API endpoints for the frontend

## Recent Changes

- Implemented ArmsVault inventory management system
  - Added storage location management functionality
  - Added transaction management for tracking inventory movements
  - Added reporting system for inventory analysis
- Added React Router for multi-page navigation
  - Created product detail pages for AirTrack Pro, ProcessFlow, and ArmsVault
  - Implemented client-side routing
- Added security classification banners that change based on page content
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

# Run the server (production mode)
make run

# Run frontend and backend in development mode
make dev

# Run just the frontend dev server
make dev-frontend

# Run just the backend in development mode
make dev-backend

# Clean build artifacts
make clean
```

## Manual Instructions

### Build the Frontend (Production)

```bash
cd frontend
npm install
npm run build
```

### Run the Backend (Production)

```bash
cd backend
go run main.go
```

Visit `http://localhost:8180` to see the app.

### Development Mode

For development with hot module reloading:

```bash
# In terminal 1
cd backend
go run main.go

# In terminal 2
cd frontend
npm run dev
```

Visit `http://localhost:5173` for the frontend with HMR enabled.

The frontend is configured to proxy API requests to the backend server running on port 8180.

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

## Future Enhancements

- Add backend API endpoints for ArmsVault data persistence
- Implement user authentication and authorization
- Add real-time updates using WebSockets
- Create mobile application using React Native