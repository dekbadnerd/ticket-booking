package handlers

import (
	"context"
	"time"

	"github.com/dekbadnerd/ticket-booking/models"
	"github.com/gofiber/fiber/v2"
)

type EventHandler struct {
	repository models.EventRepository
}

func (h *EventHandler) GetMany(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	event, err := h.repository.GetMany(context)
	if err != nil {
		return ctx.Status(fiber.StatusBadGateway).JSON(&fiber.Map{
			"status": "failed",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status": "success",
		"message": "",
		"data": event,
	})
}
func (h *EventHandler) GetOne(ctx *fiber.Ctx) error {
	return nil
}
func (h *EventHandler) CreateOne(ctx *fiber.Ctx) error {
	return nil
}

func NewEventHandler(router fiber.Router, repository models.EventRepository) {
	handler := &EventHandler{
		repository: repository,
	}

	router.Get("/", handler.GetMany)
	router.Post("/", handler.CreateOne)
	router.Get("/:eventId", handler.GetOne)
}
