package main

import (
	"embed"
	"log"

	"github.com/ryan/test/backend/pkg/container"
	"github.com/ryan/test/backend/pkg/handlers"
	"github.com/ryan/test/backend/pkg/server"
)

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