package middlewares

import (
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/dekbadnerd/ticket-booking/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

func AuthProtected(db *gorm.DB) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		authHeader := ctx.Get("Authorization")

		if authHeader == "" {
			log.Warn("empty authorization header")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		tokenParts := strings.Split(authHeader, " ")

		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			log.Warn("invalid token parts")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		tokenStr := tokenParts[1]
		secret := []byte(os.Getenv("JWT_SECRET"))

		token, err := jwt.Parse(tokenStr, func (token *jwt.Token) (interface{}, error)  {
			if token.Method.Alg() != jwt.GetSigningMethod("HS256").Alg() {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			return secret, nil
		})

		if err != nil || !token.Valid{
			log.Warn("invalid token")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		userId := token.Claims.(jwt.MapClaims)["id"]

		if err := db.Model(&models.User{}).Where("id = ?", userId).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			log.Warnf("user not found in the db")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		ctx.Locals("userId", userId)
		
		return ctx.Next()
	}
}
