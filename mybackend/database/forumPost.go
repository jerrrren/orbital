package database

import (
	_ "database/sql"
	"errors"
	_ "errors"
	"time"

	"github.com/lib/pq"
)

type Post struct {
	ID         int
	Field      string `binding:"required"`
	Name       string `binding:"required"`
	Intro      string `binding:"required"`
	Content    string `binding:"required"`
	CreatedAt  time.Time
	ModifiedAt time.Time
	Participants pq.StringArray
}

func GetPosts() ([]Post, error) {
	var posts []Post;
	rows, err := db.Query("SELECT * FROM posts")
	if err != nil {
		return nil, errors.New("There is no posts in database")
	}
	defer rows.Close()

	for rows.Next() {
		var post Post
		err := rows.Scan(&post.ID, &post.Field, &post.Name, &post.Intro, &post.Content, &post.CreatedAt, &post.ModifiedAt, &post.Participants)
		if err != nil {
			return nil, errors.New("error is scanning and assigning values from the posts")
		}
		posts = append(posts, post)
	}
	return posts, nil;
}

func GetPostById(id int) (*Post, error) {
	post := new(Post)
	row := db.QueryRow("SELECT * FROM posts where id=$1", id)
	err := row.Scan(&post.ID, &post.Field, &post.Name, &post.Intro, &post.Content, &post.CreatedAt, &post.ModifiedAt, &post.Participants)
	if err != nil {
		return nil, errors.New("unable to fetch post: invalid post id")
	}
	return post, nil
}
