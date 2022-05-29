package database

import (
	"crypto/rand"
	"errors"
	"time"

	"github.com/rs/zerolog/log"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID             int
	Username       string `binding:"required,min=5,max=30"`
	Password       string `pg:"-" binding:"required,min=7,max=32"`
	HashedPassword []byte `json:"-"`
	Salt           []byte `json:"-"`
	CreatedAt      time.Time
	ModifiedAt     time.Time
	Posts          []*Post `json:"-" pg:"fk:user_id,rel:has-many,on_delete:CASCADE"`
}

func AddUser(user *User) error {
	//generate salt and hash password
	salt, err := GenerateSalt()
	if err != nil {
		return errors.New("failed to encrypt your password")
	}
	toHash := append([]byte(user.Password), salt...)
	hashedPassword, err := bcrypt.GenerateFromPassword(toHash, bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to encrypt your password")
	}

	//assign the salt and hashedpassword to user
	user.Salt = salt
	user.HashedPassword = hashedPassword

	//add user to database
	_, err = db.Model(user).Returning("*").Insert()
	if err != nil {
		return errors.New("username is already taken")
	}
	return err
}

func Authenticate(username, password string) (*User, error) {
	user := new(User)
	if err := db.Model(user).Where(
		"username = ?", username).Select(); err != nil {
		return nil, errors.New("password/username does not match")
	}
	salted := append([]byte(password), user.Salt...)
	if err := bcrypt.CompareHashAndPassword(user.HashedPassword, salted); err != nil {
		return nil, errors.New("password/username does not match")
	}
	return user, nil
}

func GenerateSalt() ([]byte, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return salt, nil
}

func FetchUser(id int) (*User, error) {
	user := new(User)
	user.ID = id
	err := db.Model(user).Returning("*").WherePK().Select()
	if err != nil {
		log.Error().Err(err).Msg("Error fetching user")
		return nil, errors.New("unable to fetch user from database(user information passed to model might be wrong)")
	}
	return user, nil
}
