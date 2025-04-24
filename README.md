# Frontend/Backend Integration Project

This project demonstrates how to serve a React/TypeScript frontend built with Vite from a Go backend using the `go:embed` directive.

## Project Structure

- `frontend/`: React TypeScript application built with Vite
- `backend/`: Go backend server that serves the static files
- `backend/static/`: (Generated) Build output from the frontend

## Recent Changes

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
//go:embed static
var staticFiles embed.FS

func main() {
    // Get the static files from the embedded filesystem
    fsys, err := fs.Sub(staticFiles, "static")
    if err != nil {
        log.Fatal(err)
    }

    // Create a file server handler
    http.Handle("/", http.FileServer(http.FS(fsys)))
    // ...
}
```

The `fs.Sub()` function creates a new filesystem rooted at the `static` subdirectory, allowing the files to be served from the root path.