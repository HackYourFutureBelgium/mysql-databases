DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;
USE todo;

CREATE TABLE users
(
  id INT NOT NULL,
  username VARCHAR(20) NOT NULL,
  dateofbirth DATE NOT NULL,
  description VARCHAR(200),
  PRIMARY KEY (id)
);

CREATE TABLE todos
(
  id INT NOT NULL,
  descriptiontodo VARCHAR(200),
  userid INT NOT NULL,
  done BOOLEAN,
  PRIMARY KEY(id),
  FOREIGN KEY(userid) REFERENCES users (id) ON DELETE SET NULL
);

