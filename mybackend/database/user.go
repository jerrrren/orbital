package database

import (
	"crypto/rand"
	"database/sql"
	"errors"
	"time"

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
	_, err = db.Exec("INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)", user.Username, user.HashedPassword, user.Salt)
	if err != nil {
		return errors.New("username is already taken")
	}
	return err
}

func GenerateSalt() ([]byte, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return salt, nil
}

func Authenticate(username, password string) (*User, error) {
	user := new(User)
	row := db.QueryRow("Select * from users Where username=$1", username)
	err := row.Scan(&user.ID, &user.Username, &user.HashedPassword, &user.Salt, &user.CreatedAt, &user.ModifiedAt)

	if err == sql.ErrNoRows {
		return nil, errors.New("no such user exists")
	}

	salted := append([]byte(password), user.Salt...)
	if err := bcrypt.CompareHashAndPassword(user.HashedPassword, salted); err != nil {
		return nil, errors.New("incorrect password")
	}

	return user, nil
}

func FetchUser(id int) (*User, error) {
	user := new(User)
	row := db.QueryRow("Select * from users Where id=$1", id)
	err := row.Scan(&user.ID, &user.Username, &user.HashedPassword, &user.Salt, &user.CreatedAt, &user.ModifiedAt)
	if err == sql.ErrNoRows {
		return nil, errors.New("unable to fetch user: invalid user id")
	}
	return user, nil
}
