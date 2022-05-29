package database

import (
	"github.com/go-pg/pg/v10"
	"go-todo-list/internal/config"
)

var db *pg.DB

func SetDBConn(cfg config.Config) {
	options := &pg.Options{
		Addr:     cfg.DbHost + ":" + cfg.DbPort,
		Database: cfg.DbName,
		User:     cfg.DbUser,
		Password: cfg.DbPassword,
	}

	db = pg.Connect(options)
}

func GetDBConn() *pg.DB {
	return db
}
