package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
)

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

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8180"
	}

	// Start the server
	log.Printf("Server starting on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
