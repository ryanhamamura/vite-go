package container

import (
	"embed"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Container holds all application dependencies
type Container struct {
	Router     chi.Router
	StaticFiles embed.FS
}

// New creates a new application container
func New(staticFiles embed.FS) *Container {
	return &Container{
		StaticFiles: staticFiles,
	}
}

// InitializeRouter initializes the router with handlers
func (c *Container) InitializeRouter(routerFn func(embed.FS) http.Handler) {
	c.Router = routerFn(c.StaticFiles).(*chi.Mux)
}