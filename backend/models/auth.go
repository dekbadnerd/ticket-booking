package models

import (
	"context"
	"net/mail"

	"golang.org/x/crypto/bcrypt"
)

type AuthCredential struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type AuthRepository interface {
	RegisterUser(ctx context.Context, RegisterData *AuthCredential) (*User, error)
	GetUser(ctx context.Context, query interface{}, args ...interface{}) (*User, error)
}

type AuthService interface {
	Login(ctx context.Context, loginData *AuthCredential) (string, *User, error)
	Register(ctx context.Context, registerData *AuthCredential) (string, *User, error)
}

// Check if a password match a hash
func MatchesHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Check if an email is valid
func IsValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
