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

//Check request must have Token to login-only route 
func AuthProtected(db *gorm.DB) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		//Get Authorization header from request
		authHeader := ctx.Get("Authorization")

		if authHeader == "" {
			log.Warn("empty authorization header")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		//Split bearer and token string
		tokenParts := strings.Split(authHeader, " ")

		//if format uncorrect
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			log.Warn("invalid token parts")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		tokenStr := tokenParts[1]
		secret := []byte(os.Getenv("JWT_SECRET"))

		//Convert JWT string -> obj for read claims
		token, err := jwt.Parse(tokenStr, func (token *jwt.Token) (interface{}, error)  { 
			//Check algorithm (HS256)
			if token.Method.Alg() != jwt.GetSigningMethod("HS256").Alg() {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			return secret, nil //secret key for verify signature token
		})

		//Check token wrong or expired
		if err != nil || !token.Valid{
			log.Warn("invalid token")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		//Get userId from claim
		userId := token.Claims.(jwt.MapClaims)["id"]

		//Check if userId in DB
		if err := db.Model(&models.User{}).Where("id = ?", userId).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			log.Warnf("user not found in the db")

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "failed",
				"message": "Unauthorized",
			})
		}

		//Inject userId 
		ctx.Locals("userId", userId)
		
		//Allow req to go next handler
		return ctx.Next()
	}
}
