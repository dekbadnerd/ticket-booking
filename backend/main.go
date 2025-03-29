package main

import (
	"fmt"

	"github.com/dekbadnerd/ticket-booking/config"
	"github.com/dekbadnerd/ticket-booking/db"
	"github.com/dekbadnerd/ticket-booking/handlers"
	"github.com/dekbadnerd/ticket-booking/repositories"
	"github.com/gofiber/fiber/v2"
)

func main() {

	envConfig := config.NewEnvConfig()
	db := db.Init(envConfig, db.DBMigrator)

	app := fiber.New(fiber.Config{
		AppName:      "Ticket Booking",
		ServerHeader: "Fiber",
	})

	//Repository
	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)

	//router
	server := app.Group("/api")

	//Handler
	handlers.NewEventHandler(server.Group("/event"), eventRepository)
	handlers.NewTicketHandler(server.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))
}
