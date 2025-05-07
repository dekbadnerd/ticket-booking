package utils

import "github.com/golang-jwt/jwt/v5"

//Generate JWT from claims and secret key
func GenerateJWT(claims jwt.Claims, method jwt.SigningMethod, jwtSecret string) (string, error) {

	//Create a token from claims, method and sign it with a secret key
	return jwt.NewWithClaims(method, claims).SignedString([]byte(jwtSecret))
}
