-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: esport
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `game_name` varchar(255) NOT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_table`
--

DROP TABLE IF EXISTS `image_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tableId` int DEFAULT NULL,
  `tableName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tableId_UNIQUE` (`tableId`),
  UNIQUE KEY `tableName_UNIQUE` (`tableName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_table`
--

LOCK TABLES `image_table` WRITE;
/*!40000 ALTER TABLE `image_table` DISABLE KEYS */;
INSERT INTO `image_table` VALUES (1,'image-1693208064989.jpg','http://localhost:4000/image/image-1693208064989.jpg',2,'member'),(2,'image-1693210758342.jpg','http://localhost:4000/image/image-1693210758342.jpg',3,'tournament');
/*!40000 ALTER TABLE `image_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_db`
--

DROP TABLE IF EXISTS `match_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_db` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `result` enum('Win','Loss','Draw') NOT NULL,
  `team1_score` int NOT NULL,
  `team2_score` int NOT NULL,
  `schedule_id` int NOT NULL,
  `team1_id` int DEFAULT NULL,
  `team2_id` int DEFAULT NULL,
  PRIMARY KEY (`match_id`),
  KEY `schedule_id` (`schedule_id`),
  KEY `fk_team1` (`team1_id`),
  KEY `fk_team2` (`team2_id`),
  CONSTRAINT `fk_team1` FOREIGN KEY (`team1_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `fk_team2` FOREIGN KEY (`team2_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `match_db_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_db`
--

LOCK TABLES `match_db` WRITE;
/*!40000 ALTER TABLE `match_db` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `aka` varchar(50) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `member_ibfk_1` (`team_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'john_doe','$2a$10$ljNkI8xjlaA9/dflzMDNIe0U8jLR3y.T38GbY0SVK/SkPwkoK8g5e','John Doe','1995-06-15','jD','ADMIN','john.doe@example.com',5,'2023-08-15 04:37:46','2023-08-26 10:57:58'),(2,'user123','$2a$10$c2ndBrFvNXzFlOUSWAcD4eWP9dTXY.ehUgSxIxkqFFx.eE7LsVnYq','user',NULL,'user','USER',NULL,NULL,'2023-08-27 06:54:33','2023-08-27 06:54:33');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `register_id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NOT NULL,
  `tour_id` int NOT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `fee_paid` decimal(10,2) DEFAULT NULL,
  `status` enum('Pending','Competing','Eliminated','Winner') DEFAULT 'Pending',
  `position` int DEFAULT NULL,
  `round` enum('Pre-Quarterfinals','Quarter-finals','Semi-finals','Final') DEFAULT 'Pre-Quarterfinals',
  PRIMARY KEY (`register_id`),
  UNIQUE KEY `team_id` (`team_id`,`tour_id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `register_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `register_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tournament` (`tour_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(50) NOT NULL,
  `round` enum('Pre-Quarterfinals','Quarter Finals','Semi Finals','Finals') NOT NULL,
  `date_time` datetime NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `register_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `register_id` (`register_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`register_id`) REFERENCES `register` (`register_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_name` (`team_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'T1','2023-08-15 04:37:08','2023-08-27 07:05:16'),(2,'T2','2023-08-21 09:54:16','2023-08-27 07:05:16'),(3,'T3','2023-08-21 09:57:19','2023-08-27 07:05:16'),(4,'T4','2023-08-26 10:56:32','2023-08-27 07:05:16'),(5,'T5','2023-08-26 10:57:58','2023-08-27 07:05:16'),(6,'T6','2023-08-26 10:57:58','2023-08-27 07:05:16'),(7,'T7','2023-08-15 04:37:08','2023-08-15 04:37:08'),(8,'T8','2023-08-21 09:54:16','2023-08-21 09:54:16'),(9,'T9','2023-08-21 09:57:19','2023-08-21 09:57:19'),(10,'T10','2023-08-26 10:56:32','2023-08-26 10:56:32'),(11,'T11','2023-08-26 10:57:58','2023-08-26 10:57:58'),(12,'T12','2023-08-26 10:57:58','2023-08-26 10:57:58'),(13,'T13','2023-08-15 04:37:08','2023-08-15 04:37:08'),(14,'T14','2023-08-21 09:54:16','2023-08-21 09:54:16'),(15,'T15','2023-08-21 09:57:19','2023-08-21 09:57:19'),(16,'T16','2023-08-26 10:56:32','2023-08-26 10:56:32'),(17,'T17','2023-08-26 10:57:58','2023-08-26 10:57:58'),(18,'T18','2023-08-26 10:57:58','2023-08-26 10:57:58');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament` (
  `tour_id` int NOT NULL AUTO_INCREMENT,
  `tour_name` varchar(50) NOT NULL,
  `tour_detail` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `team_number` int NOT NULL,
  `win_condition` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('LAN','Online') NOT NULL DEFAULT 'Online',
  `game_name` varchar(255) NOT NULL,
  `status` enum('Pending','Ongoing','End') DEFAULT 'Pending',
  `regis_end` date DEFAULT NULL,
  PRIMARY KEY (`tour_id`),
  UNIQUE KEY `tour_name` (`tour_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28 16:25:33
