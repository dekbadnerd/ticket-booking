package db

import (
	"fmt"

	"github.com/dekbadnerd/ticket-booking/config"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// database connection and migrate table
func Init(config *config.EnvConfig, DBMigrator func(db *gorm.DB) error ) *gorm.DB {
	uri := fmt.Sprintf(`
		host=%s user=%s password=%s dbname=%s port=5432 sslmode=%s `,
		config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBSSLMode,
	)

	//Open DB connection with GORM
	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatalf("Unable to connect to the database: %v", err)
	}

	log.Info("Database connected!!!")

	if err := DBMigrator(db); err != nil {
		log.Fatalf("Unable to migrate tables : %v", err)
	}

	return db
}
