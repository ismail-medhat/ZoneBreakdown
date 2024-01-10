-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 07:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zonebreakdowndb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `name`, `email`, `password`) VALUES
(1, 'super admin', 'super.admin@gmail.com', 'super.admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `counties`
--

CREATE TABLE `counties` (
  `ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `zipcode` varchar(15) DEFAULT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `zone_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counties`
--

INSERT INTO `counties` (`ID`, `name`, `zipcode`, `lat`, `lng`, `zone_id`) VALUES
(23, '3835 Green Pond Rd, Bethlehem,', '18020', 40.6724, -75.3257, 1),
(24, 'Lehigh Valley Int\'l Airport (A', '18109', 40.6511, -75.4439, 1),
(25, '70 S Main St, New Hope, PA 189', '18938', 40.3624, -74.9502, 2),
(26, '713 Bethlehem Pike, Montgomery', '18936', 40.2497, -75.2447, 2),
(27, 'Philadelphia International Air', '19153', 39.8731, -75.2437, 2),
(28, 'Chester, PA, USA', '', 39.8496, -75.3557, 3),
(29, 'Delaware Water Gap, PA, USA', '', 40.9793, -75.143, 3),
(30, '1665 State Hill Rd, Wyomissing', '19610', 40.3403, -75.9705, 4),
(31, 'Schuylkill River Park, 300 S 2', '19103', 39.9488, -75.1818, 4),
(32, '181 Thompson St, New York, NY ', '10012', 40.728, -74.0002, 5),
(33, 'Monroeville, Upper Pittsgrove,', '08343', 39.629, -75.1594, 5),
(34, 'Pike County, PA, USA', '', 41.3362, -75.0611, 5),
(35, '200 N River St, Wilkes-Barre, ', '18711', 41.2516, -75.879, 6),
(36, '29 Wyoming Valley Mall, Wilkes', '18702', 41.2465, -75.8445, 6),
(37, '501 Vine St, Scranton, PA 1850', '18509', 41.4117, -75.6589, 6);

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `active_agent` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`ID`, `name`, `active_agent`) VALUES
(1, 'zone 1', 0),
(2, 'zone 2', 0),
(3, 'zone 3', 0),
(4, 'zone 4', 0),
(5, 'zone 5', 0),
(6, 'zone 6', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `counties`
--
ALTER TABLE `counties`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `counties`
--
ALTER TABLE `counties`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
