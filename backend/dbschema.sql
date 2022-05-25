DROP TABLE IF EXISTS users;
CREATE TABLE users (
    uid		    SERIAL PRIMARY KEY,
    name		TEXT,
    password	TEXT
);