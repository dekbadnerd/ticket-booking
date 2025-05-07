package repositories

import (
	"context"

	"github.com/dekbadnerd/ticket-booking/models"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

//Save new User data to Database
func (r *AuthRepository) RegisterUser(ctx context.Context, registerData *models.AuthCredential) (*models.User, error) {
	user := &models.User{
		Email: registerData.Email,
		Password: registerData.Password,
	}

	res := r.db.Model(&models.User{}).Create(user)

	if res.Error != nil {
		return nil, res.Error
	}

	return user, nil
}

//Search user data from databse with condition
func (r *AuthRepository) GetUser(ctx context.Context, query interface{}, args ...interface{}) (*models.User, error) {
	user := &models.User{}
	res := r.db.Model(user).Where(query, args...).First(user)

	if res.Error != nil {
		return nil, res.Error
	}

	return user, nil
}



func NewAuthRepository(db *gorm.DB) models.AuthRepository {
	return &AuthRepository{
		db: db,
	}
}
