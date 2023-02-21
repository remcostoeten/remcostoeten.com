CREATE DATABASE todoapp;

CREATE TABLE todos(
    id VRCHAR(255) PRIMARY KEY,
      user_email VARCHAR(255), 
      title VARCHAR(30),
       progress INT, 
       date VARCHAR(300)
);


INSERT INTO todos(id, user_email, title, progres, (date) VALUES(0,'r@hootmail.com', 'First todo', 10, 3-12-1996
