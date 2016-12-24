# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: cmpe295project.cznys0ru7jj1.us-west-2.rds.amazonaws.com (MySQL 5.5.5-10.0.24-MariaDB)
# Database: CMPE295
# Generation Time: 2016-12-24 22:13:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Departments`;

CREATE TABLE `Departments` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `group_email` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `unique_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_email` (`group_email`),
  UNIQUE KEY `group_email_2` (`group_email`),
  UNIQUE KEY `unique_code` (`unique_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Departments` WRITE;
/*!40000 ALTER TABLE `Departments` DISABLE KEYS */;

INSERT INTO `Departments` (`id`, `name`, `description`, `address`, `phone`, `group_email`, `createdAt`, `updatedAt`, `unique_code`)
VALUES
	('7582e3ab-670a-4993-aaee-f3006c23598e','Department of mobility and vehicle','DMV',NULL,'n/a','dmv@gov.com','2016-11-16 14:12:02','2016-11-16 14:12:02','DMV');

/*!40000 ALTER TABLE `Departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Memberships
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Memberships`;

CREATE TABLE `Memberships` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `group_id` varchar(36) NOT NULL,
  `group_type` enum('office','department') DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `permission_id` varchar(36) NOT NULL,
  `isAdmin` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  KEY `memberships_idx` (`user_id`,`group_id`),
  KEY `fk_PermissionId` (`permission_id`),
  KEY `fk_RoleId` (`role_id`),
  CONSTRAINT `Memberships_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `Departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Memberships_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `Offices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PermissionId` FOREIGN KEY (`permission_id`) REFERENCES `Permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_RoleId` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Offices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Offices`;

CREATE TABLE `Offices` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `group_email` varchar(100) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `unique_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_email` (`group_email`),
  UNIQUE KEY `group_email_2` (`group_email`),
  UNIQUE KEY `unique_code` (`unique_code`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `Offices_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Offices` WRITE;
/*!40000 ALTER TABLE `Offices` DISABLE KEYS */;

INSERT INTO `Offices` (`id`, `name`, `description`, `address`, `phone`, `group_email`, `department_id`, `createdAt`, `updatedAt`, `unique_code`)
VALUES
	('99b7ebc7-f584-4c80-b2cb-116ef54dadb0','El Camino Office','DMV-El Camino',NULL,'n/a','dmv01@gov.com','7582e3ab-670a-4993-aaee-f3006c23598e','2016-11-16 14:53:20','2016-11-16 14:53:20','DMV01');

/*!40000 ALTER TABLE `Offices` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Permissions`;

CREATE TABLE `Permissions` (
  `id` varchar(36) NOT NULL,
  `manage_member` bit(1) NOT NULL,
  `manage_write` bit(1) NOT NULL,
  `manage_read` bit(1) NOT NULL,
  `manage_delete` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Process_Notifications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Process_Notifications`;

CREATE TABLE `Process_Notifications` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `process_id` varchar(36) NOT NULL,
  `notification_type` enum('assigned','unassigned','commented','contacted') DEFAULT NULL,
  `notification_message` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Process_Notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ProcessAdmin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProcessAdmin`;

CREATE TABLE `ProcessAdmin` (
  `process_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  KEY `process_id` (`process_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ProcessAdmin_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `Processes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProcessAdmin_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Processes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Processes`;

CREATE TABLE `Processes` (
  `id` varchar(36) NOT NULL,
  `workflow_id` varchar(36) NOT NULL,
  `enabled_flag` bit(1) DEFAULT b'0',
  `currentStateId` int(11) NOT NULL,
  `next_states` blob,
  `process_type` varchar(36) DEFAULT NULL,
  `critical` enum('1','2','3','4','5') DEFAULT NULL,
  `due_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `workflow_id` (`workflow_id`),
  KEY `fk_ProcessTypes` (`process_type`),
  CONSTRAINT `Processes_ibfk_1` FOREIGN KEY (`workflow_id`) REFERENCES `Workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ProcessTypes` FOREIGN KEY (`process_type`) REFERENCES `ProcessTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ProcessFiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProcessFiles`;

CREATE TABLE `ProcessFiles` (
  `id` varchar(36) NOT NULL,
  `process_id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `filename` varchar(500) NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `process_id` (`process_id`),
  CONSTRAINT `ProcessFiles_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `Processes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ProcessNotes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProcessNotes`;

CREATE TABLE `ProcessNotes` (
  `id` varchar(36) NOT NULL,
  `process_id` varchar(36) NOT NULL,
  `creator_id` varchar(36) NOT NULL,
  `note` varchar(500) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `process_id` (`process_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `ProcessNotes_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `Processes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProcessNotes_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ProcessTypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ProcessTypes`;

CREATE TABLE `ProcessTypes` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `department_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `ProcessTypes_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table StateTypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `StateTypes`;

CREATE TABLE `StateTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Tags`;

CREATE TABLE `Tags` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `isAdmin` bit(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table WorkflowFiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `WorkflowFiles`;

CREATE TABLE `WorkflowFiles` (
  `id` varchar(36) NOT NULL,
  `workflow_id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `filename` varchar(500) NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_id` (`workflow_id`),
  CONSTRAINT `WorkflowFiles_ibfk_1` FOREIGN KEY (`workflow_id`) REFERENCES `Workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Workflows
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Workflows`;

CREATE TABLE `Workflows` (
  `id` varchar(36) NOT NULL,
  `type_id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `currentStateId` int(11) NOT NULL,
  `note` varchar(500) DEFAULT NULL,
  `creator_id` varchar(36) DEFAULT NULL,
  `critical` enum('1','2','3','4','5') DEFAULT NULL,
  `due_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `currentStateId` (`currentStateId`),
  KEY `fk_CreatorId` (`creator_id`),
  CONSTRAINT `Workflows_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `WorkflowTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Workflows_ibfk_2` FOREIGN KEY (`currentStateId`) REFERENCES `StateTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_CreatorId` FOREIGN KEY (`creator_id`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table WorkflowTypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `WorkflowTypes`;

CREATE TABLE `WorkflowTypes` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `tag_id` varchar(36) NOT NULL,
  `flows` blob,
  PRIMARY KEY (`id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `WorkflowTypes_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
