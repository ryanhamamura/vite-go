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

	// API routes
	r.Route("/api", func(r chi.Router) {
		// User registration
		r.Post("/register", RegisterUser)
		
		// Authentication
		r.Route("/auth", func(r chi.Router) {
			r.Post("/login", SmartcardLogin)
			r.Post("/logout", Logout)
			r.Post("/refresh", RefreshToken)
			r.Get("/me", GetCurrentUser)
			r.Get("/cert-status", CertificateStatus)
		})
	})

	// Setup static file serving
	fsys, err := fs.Sub(staticFiles, "dist")
	if err != nil {
		panic(err)
	}

	// Static files route - must be last
	r.Handle("/*", http.FileServer(http.FS(fsys)))

	return r
}