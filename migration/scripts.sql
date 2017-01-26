# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: cmpe295.cznys0ru7jj1.us-west-2.rds.amazonaws.com (MySQL 5.5.5-10.0.24-MariaDB)
# Database: CMPE295
# Generation Time: 2017-01-22 23:25:06 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ProcessAdmin
# ------------------------------------------------------------

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

CREATE TABLE `Processes` (
  `id` varchar(36) NOT NULL,
  `workflow_id` varchar(36) NOT NULL,
  `enabled_flag` bit(1) DEFAULT b'0',
  `currentStateId` int(11) NOT NULL,
  `next_states` blob,
  `process_type` varchar(36) DEFAULT NULL,
  `critical` enum('1','2','3','4','5') DEFAULT NULL,
  `due_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `workflow_id` (`workflow_id`),
  KEY `fk_ProcessTypes` (`process_type`),
  CONSTRAINT `Processes_ibfk_1` FOREIGN KEY (`workflow_id`) REFERENCES `Workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ProcessTypes` FOREIGN KEY (`process_type`) REFERENCES `ProcessTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ProcessFiles
# ------------------------------------------------------------

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

CREATE TABLE `ProcessTypes` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `department_id` varchar(36) NOT NULL,
  `type` enum('auto-approve','agent-approve','admin-approve') DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `ProcessTypes_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Roles
# ------------------------------------------------------------

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table StateTypes
# ------------------------------------------------------------

CREATE TABLE `StateTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Tags
# ------------------------------------------------------------

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

CREATE TABLE `Workflows` (
  `id` varchar(36) NOT NULL,
  `type_id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `currentStateId` int(11) NOT NULL,
  `note` varchar(500) DEFAULT NULL,
  `critical` enum('1','2','3','4','5') DEFAULT NULL,
  `due_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `longitude` decimal(10,2) DEFAULT NULL,
  `latitude` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `currentStateId` (`currentStateId`),
  CONSTRAINT `Workflows_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `WorkflowTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Workflows_ibfk_2` FOREIGN KEY (`currentStateId`) REFERENCES `StateTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table WorkflowTypes
# ------------------------------------------------------------

CREATE TABLE `WorkflowTypes` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `tag_id` varchar(36) NOT NULL,
  `flows` blob,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_deleted` tinyint(1) DEFAULT NULL,
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
