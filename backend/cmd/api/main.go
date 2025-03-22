package main

import (
	"github.com/dekbadnerd/ticket-booking/repositories"
	"github.com/dekbadnerd/ticket-booking/handlers"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName:      "Ticket Booking",
		ServerHeader: "Fiber",
	})

	//Repository
	eventRepository := repositories.NewEventRepository(nil)

	//router
	server := app.Group("/api")

	//Handler
	handlers.NewEventHandler(server.Group("/event"), eventRepository)

	app.Listen(":3000")
}
