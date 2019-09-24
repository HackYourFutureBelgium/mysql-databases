DROP SCHEMA IF EXISTS hyf_db_w2_todo;
CREATE SCHEMA hyf_db_w2_todo;
USE hyf_db_w2_todo;
SET AUTOCOMMIT=0;

--
-- Table structure for table `Users`
--
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200),
  `description` VARCHAR(500),
  `birthday` date,
  PRIMARY KEY (`id`)
);

-- 
-- Table structure for table `Activities`
--
DROP TABLE IF EXISTS `Activities`;
CREATE TABLE `Activities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(500),
  `state`  TINYINT(1),
  `user` INT(11),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `Activities_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`id`)
);
