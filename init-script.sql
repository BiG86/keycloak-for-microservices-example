DROP USER IF EXISTS 'bookmanager';
CREATE USER IF NOT EXISTS 'bookmanager'@'%' identified BY 'bookmanager';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `bookmanager`;
GRANT ALL PRIVILEGES ON bookmanager.* TO 'bookmanager'@'%';

USE `bookmanager`;

-- Dump della struttura di tabella bookmanager.BOOK
CREATE TABLE IF NOT EXISTS `BOOK` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(255) NOT NULL,
  `TITLE` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `DATE_INSERT` datetime(6) NOT NULL,
  `DATE_MODIFY` datetime(6) DEFAULT NULL,
  `LAST_USER_MODIFY` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;
