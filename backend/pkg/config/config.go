package config

// Config stores application configuration
type Config struct {
	Port string
}

// New creates a default configuration
func New() *Config {
	return &Config{
		Port: "8180",
	}
}