package handlers

import (
	"embed"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

// Router creates a new chi router with all route handlers registered
func NewRouter(staticFiles embed.FS) http.Handler {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Setup static file serving
	fsys, err := fs.Sub(staticFiles, "dist")
	if err != nil {
		panic(err)
	}

	// Static files route
	r.Handle("/*", http.FileServer(http.FS(fsys)))

	return r
}