DROP SCHEMA IF EXISTS todo;
CREATE SCHEMA todo;
USE todo;
SET AUTOCOMMIT=0;

--
-- Table structure for table `Users`
--
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` VARCHAR(200) NOT NULL UNIQUE,
  `username`  VARCHAR(200) NOT NULL UNIQUE,
  `description` VARCHAR(500),
  `birthday` DATE,
  PRIMARY KEY (`id`)
);

-- 
-- Table structure for table `Activities` 
--
DROP TABLE IF EXISTS `Activities`;
CREATE TABLE `Activities` (
  `id` VARCHAR(200) NOT NULL UNIQUE,
  `description` VARCHAR(500) NOT NULL,
  `state`  BOOLEAN DEFAULT 0,
  `user` VARCHAR(200) NOT NULL ,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`)  REFERENCES `Users` (`id`)
   ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE USER IF NOT EXISTS 'hyfuser'@'localhost' IDENTIFIED BY 'hyfpassword';
grant all privileges on *.* to 'hyfuser'@'localhost';