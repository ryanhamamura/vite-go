package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

// Server represents the HTTP server
type Server struct {
	router http.Handler
	port   string
}

// New creates a new server instance
func New(router http.Handler) *Server {
	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8180"
	}

	return &Server{
		router: router,
		port:   port,
	}
}

// Start starts the HTTP server
func (s *Server) Start() error {
	addr := fmt.Sprintf(":%s", s.port)
	log.Printf("Server starting on http://localhost:%s", s.port)
	return http.ListenAndServe(addr, s.router)
}