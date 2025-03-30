package handlers

import (
	"context"
	"fmt"
	"time"

	"github.com/dekbadnerd/ticket-booking/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var validate = validator.New()

type AuthHandler struct {
	service models.AuthService
}

func (h *AuthHandler) Login(ctx *fiber.Ctx) error {
	creds := &models.AuthCredential{}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	if err := ctx.BodyParser(&creds); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": err.Error(),
			"data":    nil,
		})
	}

	if err := validate.Struct(creds); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	token, user, err := h.service.Login(context, creds)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Successfully login",
		"data": &fiber.Map{
			"token": token,
			"user":  user,
		},
	})
}

func (h *AuthHandler) Register(ctx *fiber.Ctx) error {
	creds := &models.AuthCredential{}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	if err := ctx.BodyParser(&creds); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": err.Error(),
			"data":    nil,
		})
	}

	if err := validate.Struct(creds); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": fmt.Errorf("please, provide a valid email and password to register").Error(),
		})
	}

	token, user, err := h.service.Register(context, creds)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Successfully login",
		"data": &fiber.Map{
			"token": token,
			"user":  user,
		},
	})
}

func NewAuthHandler(router fiber.Router, service models.AuthService) {
	handler := &AuthHandler{
		service: service,
	}

	router.Post("/login", handler.Login)
	router.Post("/register", handler.Register)
}
