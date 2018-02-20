-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: remarkdd
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users_tb`
--

DROP TABLE IF EXISTS `users_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_tb` (
  `users_guid` varchar(45) NOT NULL,
  `users_email` varchar(255) NOT NULL,
  `users_password` varchar(36) NOT NULL,
  `users_datecreated` varchar(255) NOT NULL,
  `users_username` varchar(24) NOT NULL,
  `users_fname` varchar(45) DEFAULT NULL,
  `users_lname` varchar(45) DEFAULT NULL,
  `users_verifycation` varchar(255) NOT NULL,
  `users_activated` varchar(255) NOT NULL DEFAULT 'nonactive',
  `users_phoneNum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`users_guid`),
  UNIQUE KEY `users_screenName_UNIQUE` (`users_guid`),
  UNIQUE KEY `users_username_UNIQUE` (`users_username`),
  UNIQUE KEY `users_verifycation_UNIQUE` (`users_verifycation`),
  UNIQUE KEY `users_email_UNIQUE` (`users_email`),
  UNIQUE KEY `users_phoneNum_UNIQUE` (`users_phoneNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_tb`
--

LOCK TABLES `users_tb` WRITE;
/*!40000 ALTER TABLE `users_tb` DISABLE KEYS */;
INSERT INTO `users_tb` VALUES ('259fd770-ddaa-11e6-83be-dbbe6b869df7','dfg@hotmail','10ae7c7ac7335ceb633761b90d515698','date time','thisisanothe','tom','balaban','259ffe80-ddaa-11e6-83be-dbbe6b869df7','nonactive',NULL),('33cf9340-c733-11e6-af77-45d34578f316','nh1492@yahoo.com','65212c462cf4435a31c1156d9a33dae7','date time','paladen','tom','balaban','33cfba50-c733-11e6-af77-45d34578f316','nonactive','7247101510'),('33cf9340-c734-11e6-af77-45d34578f316','nh1432492@yahoo.com','65212c462cf4435a31c1156d9a33dae7','date time','paladen2','tom','balaban','33c4ba50-c733-11e6-af77-45d34578f316','nonactive','7247101515'),('51b8e770-ddaa-11e6-a2d0-cb3e37ad818c','g222@hotmail','10ae7c7ac7335ceb633761b90d515698','date time','adsffewwe','tom','balaban','51b90e80-ddaa-11e6-a2d0-cb3e37ad818c','nonactive',NULL),('8056ea10-dda9-11e6-97da-5b2ff57ba450','g@hotmail','10ae7c7ac7335ceb633761b90d515698','date time','thisisauser','tom','balaban','80573830-dda9-11e6-97da-5b2ff57ba450','nonactive',NULL),('93ce2bc0-ddaa-11e6-9828-6b955c2892ad','g123123123@hotmail','10ae7c7ac7335ceb633761b90d515698','2017-01-18 13:18:57','123sda','tom','balaban','93ce52d0-ddaa-11e6-9828-6b955c2892ad','nonactive',NULL),('b0130d40-ddb0-11e6-9b27-315ae05be8c7','balabandesign@live.com','65212c462cf4435a31c1156d9a33dae7','2017-01-18 14:02:41','hi im goober','thomas','balaban','b0133450-ddb0-11e6-9b27-315ae05be8c7','nonactive','7247101502');
/*!40000 ALTER TABLE `users_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-04 14:54:47
