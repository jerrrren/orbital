DROP TABLE IF EXISTS users;
CREATE TABLE users (
    uid		    SERIAL PRIMARY KEY,
    name		TEXT,
    password	TEXT,
    token	TEXT,
    refresh_token TEXT,
    user_type TEXT
);

--DROP TABLE IF EXISTS chats;
--CREATE TABLE chats(
    --messageID SERIAL PRIMARY KEY,
    --user_id_1 INT, 
    --user_id_2 INT,
    --current_time TIMESTAMP WITH TIME ZONE DEFAULT now(), 
    --message TEXT,
    --FOREIGN KEY(user_id_1) REFERENCES users(uid) ON DELETE CASCADE,
    --FOREIGN KEY(user_id_2) REFERENCES users(uid) ON DELETE CASCADE
    
--)