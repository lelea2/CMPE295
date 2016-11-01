# CMPE295
Master final project

```sql
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
)

CREATE TABLE Departments(
id VARCHAR(36) NOT NULL,
name VARCHAR(200) NOT NULL,
description VARCHAR(500),
address VARCHAR(500),
phone VARCHAR(100),
group_email VARCHAR(100) NOT NULL,
createdAt timestamp NULL DEFAULT NULL,
updatedAt timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `group_email` (`group_email`)
)

CREATE TABLE Offices(
id VARCHAR(36) NOT NULL,
name VARCHAR(200) NOT NULL,
description VARCHAR(500),
address VARCHAR(500),
phone VARCHAR(100),
group_email VARCHAR(100) NOT NULL,
department_id VARCHAR(36) NOT NULL,
createdAt timestamp NULL DEFAULT NULL,
updatedAt timestamp NULL DEFAULT NULL,
FOREIGN KEY(department_id) REFERENCES Departments(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY (`id`),
UNIQUE KEY `group_email` (`group_email`)
)

CREATE TABLE Memberships(
id VARCHAR(36) NOT NULL,
user_id VARCHAR(36) NOT NULL,
group_id VARCHAR(36) NOT NULL,
group_type ENUM('office','department'),
createdAt timestamp NULL DEFAULT NULL,
updatedAt timestamp NULL DEFAULT NULL,
isAdmin BIT(1) NOT NULL,
FOREIGN KEY(group_id) REFERENCES Departments(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(group_id) REFERENCES Offices(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY (id),
UNIQUE KEY (user_id, group_id),
INDEX memberships_idx (user_id, group_id)
)
```
