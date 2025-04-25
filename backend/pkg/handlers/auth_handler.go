package handlers

import (
	"crypto/x509"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWTConfig contains the configuration for JWT tokens
type JWTConfig struct {
	SecretKey     string
	TokenDuration time.Duration
}

// User represents a user in the system
type User struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Rank       string `json:"rank"`
	JDIR       string `json:"jdir"`
	SubjectDN  string `json:"subjectName"`
	Role       string `json:"role"`
}

// AuthResponse is the response returned on successful authentication
type AuthResponse struct {
	User         User   `json:"user"`
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

// Claims defines the structure for JWT claims
type Claims struct {
	UserID      string `json:"userId"`
	Email       string `json:"email"`
	SubjectDN   string `json:"subjectDn"`
	Role        string `json:"role"`
	jwt.RegisteredClaims
}

// DefaultJWTConfig returns a default JWT configuration
func DefaultJWTConfig() JWTConfig {
	return JWTConfig{
		SecretKey:     "your-secret-key", // In production, this should be a secure key from environment variables
		TokenDuration: 24 * time.Hour,    // 24 hours
	}
}

// SmartcardLogin handles client certificate authentication
func SmartcardLogin(w http.ResponseWriter, r *http.Request) {
	// Ensure this is a POST request
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get the client certificate
	if len(r.TLS.PeerCertificates) == 0 {
		http.Error(w, "No client certificate provided", http.StatusUnauthorized)
		return
	}

	// Extract the client certificate
	clientCert := r.TLS.PeerCertificates[0]

	// Extract the subject DN
	subjectDN := extractSubjectDN(clientCert)

	// In a real system, you would look up the user based on the certificate's subject DN
	// For this example, we'll create a mock user
	user := findUserBySubjectDN(subjectDN)
	if user == nil {
		http.Error(w, "User not found for certificate", http.StatusUnauthorized)
		return
	}

	// Create JWT tokens
	config := DefaultJWTConfig()
	token, refreshToken, err := generateTokens(user, config)
	if err != nil {
		http.Error(w, "Failed to generate tokens", http.StatusInternalServerError)
		return
	}

	// Create the response
	response := AuthResponse{
		User:         *user,
		Token:        token,
		RefreshToken: refreshToken,
	}

	// Return the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// CertificateStatus returns the status of the client certificate
func CertificateStatus(w http.ResponseWriter, r *http.Request) {
	// Ensure this is a GET request
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Check if client certificate is present
	if len(r.TLS.PeerCertificates) == 0 {
		http.Error(w, "No client certificate provided", http.StatusUnauthorized)
		return
	}

	// Extract the client certificate
	clientCert := r.TLS.PeerCertificates[0]

	// Create response with certificate details
	response := map[string]interface{}{
		"status":      "valid",
		"subject":     clientCert.Subject.String(),
		"issuer":      clientCert.Issuer.String(),
		"notBefore":   clientCert.NotBefore,
		"notAfter":    clientCert.NotAfter,
		"fingerprint": fingerprint(clientCert),
		"valid":       time.Now().After(clientCert.NotBefore) && time.Now().Before(clientCert.NotAfter),
	}

	// Return the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Logout handles user logout
func Logout(w http.ResponseWriter, r *http.Request) {
	// In a real implementation, you might want to invalidate the token
	// For now, just return a success message
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Logged out successfully"})
}

// GetCurrentUser returns the current user based on the token
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	// Extract user ID from token (in a real implementation)
	// For now, just return a mock user
	tokenString := extractTokenFromHeader(r)
	if tokenString == "" {
		http.Error(w, "No authorization token provided", http.StatusUnauthorized)
		return
	}

	// Parse the token
	config := DefaultJWTConfig()
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.SecretKey), nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	// Extract claims
	claims, ok := token.Claims.(*Claims)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	// Get user from claims
	user := findUserByID(claims.UserID)
	if user == nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// Return the user
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// RefreshToken handles token refresh
func RefreshToken(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var requestBody struct {
		RefreshToken string `json:"refreshToken"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Validate refresh token
	config := DefaultJWTConfig()
	token, err := jwt.ParseWithClaims(requestBody.RefreshToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.SecretKey), nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
		return
	}

	// Extract claims
	claims, ok := token.Claims.(*Claims)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	// Get user from claims
	user := findUserByID(claims.UserID)
	if user == nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// Generate new tokens
	newToken, newRefreshToken, err := generateTokens(user, config)
	if err != nil {
		http.Error(w, "Failed to generate tokens", http.StatusInternalServerError)
		return
	}

	// Return the new tokens
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":        newToken,
		"refreshToken": newRefreshToken,
	})
}

// Helper functions

// extractSubjectDN extracts the subject DN from a certificate
func extractSubjectDN(cert *x509.Certificate) string {
	return cert.Subject.String()
}

// fingerprint calculates the SHA-256 fingerprint of the certificate
func fingerprint(cert *x509.Certificate) string {
	// In a real implementation, you would calculate the SHA-256 fingerprint
	return "mock-fingerprint"
}

// findUserBySubjectDN finds a user by their certificate subject DN
func findUserBySubjectDN(subjectDN string) *User {
	// In a real implementation, you would look up the user in a database
	// For this example, we'll return a mock user
	return &User{
		ID:         "1",
		Email:      "user@example.com",
		FirstName:  "John",
		LastName:   "Doe",
		Rank:       "Capt",
		JDIR:       "ABC123",
		SubjectDN:  subjectDN,
		Role:       "user",
	}
}

// findUserByID finds a user by their ID
func findUserByID(id string) *User {
	// In a real implementation, you would look up the user in a database
	// For this example, we'll return a mock user
	return &User{
		ID:         id,
		Email:      "user@example.com",
		FirstName:  "John",
		LastName:   "Doe",
		Rank:       "Capt",
		JDIR:       "ABC123",
		SubjectDN:  "CN=John Doe,O=Example,C=US",
		Role:       "user",
	}
}

// generateTokens generates JWT tokens for a user
func generateTokens(user *User, config JWTConfig) (string, string, error) {
	// Create access token
	claims := Claims{
		UserID:    user.ID,
		Email:     user.Email,
		SubjectDN: user.SubjectDN,
		Role:      user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(config.TokenDuration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(config.SecretKey))
	if err != nil {
		return "", "", err
	}

	// Create refresh token with longer expiry
	refreshClaims := Claims{
		UserID:    user.ID,
		Email:     user.Email,
		SubjectDN: user.SubjectDN,
		Role:      user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(config.TokenDuration * 7)), // 7 times longer
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshTokenString, err := refreshToken.SignedString([]byte(config.SecretKey))
	if err != nil {
		return "", "", err
	}

	return tokenString, refreshTokenString, nil
}

// extractTokenFromHeader extracts the token from the Authorization header
func extractTokenFromHeader(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")
	if bearerToken == "" {
		return ""
	}

	// Check if the header has the correct format
	parts := strings.Split(bearerToken, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return ""
	}

	return parts[1]
}