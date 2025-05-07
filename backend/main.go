package main

import (
	"fmt"

	"github.com/dekbadnerd/ticket-booking/config"
	"github.com/dekbadnerd/ticket-booking/db"
	"github.com/dekbadnerd/ticket-booking/handlers"
	"github.com/dekbadnerd/ticket-booking/middlewares"
	"github.com/dekbadnerd/ticket-booking/repositories"
	"github.com/dekbadnerd/ticket-booking/services"
	"github.com/gofiber/fiber/v2"
)

func main() {
	envConfig := config.NewEnvConfig()

	//Connect to Database (Postgres), Auto Migration 
	db := db.Init(envConfig, db.DBMigrator)

	app := fiber.New(fiber.Config{
		AppName:      "Ticket Booking",
		ServerHeader: "Fiber",
	})

	//Repository
	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)
	authRepository := repositories.NewAuthRepository(db)

	//Service
	authService := services.NewAuthService(authRepository)

	//router
	server := app.Group("/api")
	handlers.NewAuthHandler(server.Group("/auth"), authService)

	//Middleware Check Token before next route 
	privateRoutes := server.Use(middlewares.AuthProtected(db))

	//Handler
	handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))
}
