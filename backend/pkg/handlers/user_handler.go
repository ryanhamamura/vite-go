package handlers

import (
	"encoding/json"
	"net/http"
)

// UserRegistration represents the data for user registration
type UserRegistration struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Rank      string `json:"rank"`
	JDIR      string `json:"jdir"`
}

// RegisterUser handles user registration
func RegisterUser(w http.ResponseWriter, r *http.Request) {
	// Only allow POST method
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse JSON request body
	var userData UserRegistration
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if userData.FirstName == "" || userData.LastName == "" || userData.Email == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// In a real application, you would:
	// 1. Validate the data more thoroughly
	// 2. Check for existing users with the same email
	// 3. Hash the password
	// 4. Save to database
	// 5. Generate a token
	// 6. Return the user and token

	// For now, just return a success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
	})
}