-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2022 at 12:05 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamblego1`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCaseItem_select` (IN `id` INT)  READS SQL DATA
SELECT i.IDItem, cs.SkinName, cs.SkinImage, i.ItemPrice, cr.RarityName, cq.QualityName
FROM item i
INNER JOIN cskins cs ON cs.IDSkin = i.IDSkin
INNER JOIN crarity cr ON cr.IDRarity = i.IDRarity
INNER JOIN cquality cq ON cq.IDQuality = i.IDQuality
WHERE i.IDCase = id
ORDER BY cs.SkinName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pCases_select` ()  SELECT *
FROM cases$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pCase_select` (IN `id` INT)  READS SQL DATA
SELECT *
FROM cases
WHERE IDCase = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pInventory_delete` (IN `idO` INT, IN `idI` INT)  MODIFIES SQL DATA
DELETE FROM inventory WHERE IDOwner = idO AND IDItem = idI$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pInventory_select` (IN `id` INT)  READS SQL DATA
SELECT i.IDItem, cs.SkinName, cs.SkinImage, cr.RarityName, cq.QualityName, iv.Amount, i.ItemPrice, ca.CaseName
FROM inventory iv
INNER JOIN item i ON i.IDItem = iv.IDItem
INNER JOIN cskins cs ON cs.IDSkin = i.IDSkin
INNER JOIN crarity cr ON cr.IDRarity = i.IDRarity
INNER JOIN cquality cq ON cq.IDQuality = i.IDQuality
INNER JOIN cases ca ON ca.IDCase = i.IDCase
WHERE IDOwner = id
ORDER BY cs.SkinName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pInventory_update` (IN `owner` INT, IN `item` INT, IN `ks` INT)  MODIFIES SQL DATA
IF (SELECT IDItem FROM inventory WHERE IDOwner = owner AND IDItem = item) THEN
BEGIN
	UPDATE inventory SET Amount = Amount + ks
    WHERE IDOwner = owner AND IDItem = item;
END;
ELSE
BEGIN
	INSERT INTO `inventory`(`IDOwner`, `IDItem`, `Amount`)
    VALUES (owner, item, ks);

END;
END IF$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pItems_select` ()  SELECT i.IDItem, cs.SkinName, cs.SkinImage, cr.RarityName, cq.QualityName, i.ItemPrice, c.CaseName
FROM item i
INNER JOIN cases c ON c.IDCase = i.IDCase
INNER JOIN cskins cs ON cs.IDSkin = i.IDSkin
INNER JOIN crarity cr ON cr.IDRarity = i.IDRarity
INNER JOIN cquality cq ON cq.IDQuality = i.IDQuality$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pItem_select` (IN `id` INT)  READS SQL DATA
SELECT i.IDItem, cs.SkinName, cr.RarityName, cq.QualityName, i.ItemPrice, c.CaseName
FROM item i
INNER JOIN cases c ON c.IDCase = i.IDCase
INNER JOIN cskins cs ON cs.IDSkin = i.IDSkin
INNER JOIN crarity cr ON cr.IDRarity = i.IDRarity
INNER JOIN cquality cq ON cq.IDQuality = i.IDQuality
WHERE IDItem = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pOwners_select` ()  SELECT * 
FROM cowner$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pOwner_delete` (IN `id` INT)  MODIFIES SQL DATA
BEGIN
DELETE FROM inventory WHERE IDOwner = id;
DELETE FROM cowner WHERE IDOwner = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pOwner_insert` (IN `name` VARCHAR(255), IN `token` INT)  MODIFIES SQL DATA
INSERT INTO `cowner`(`OwnerNickname`, `Token`)
    VALUES (name, token)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pOwner_select` (IN `Nickname` VARCHAR(255))  READS SQL DATA
SELECT * FROM cowner WHERE OwnerNickname = Nickname$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pWallet_select` (IN `id` INT)  READS SQL DATA
SELECT * FROM cowner WHERE IDOwner = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pWallet_update` (IN `id` INT, IN `value` INT)  MODIFIES SQL DATA
UPDATE cowner SET Token = Token + value
WHERE IDOwner = id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `IDCase` int(11) NOT NULL,
  `CaseName` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `CasePrice` int(11) NOT NULL,
  `CaseImage` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`IDCase`, `CaseName`, `CasePrice`, `CaseImage`) VALUES
(1, 'Chroma Case', 150, 'chroma.webp'),
(2, 'Chroma 2 Case', 150, 'chroma2.webp'),
(3, 'Chroma 3 Case', 200, 'chroma3.webp');

-- --------------------------------------------------------

--
-- Table structure for table `cowner`
--

CREATE TABLE `cowner` (
  `IDOwner` int(11) NOT NULL,
  `OwnerNickname` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `Token` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `cowner`
--

INSERT INTO `cowner` (`IDOwner`, `OwnerNickname`, `Token`) VALUES
(1, 'VeleAdam', 3002),
(2, 'VirtualC', 171222);

-- --------------------------------------------------------

--
-- Table structure for table `cquality`
--

CREATE TABLE `cquality` (
  `IDQuality` int(11) NOT NULL,
  `QualityName` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `cquality`
--

INSERT INTO `cquality` (`IDQuality`, `QualityName`) VALUES
(1, 'Battle Scarred'),
(2, 'Well Worn'),
(3, 'Field Tested'),
(4, 'Minimal Wear'),
(5, 'Factory New');

-- --------------------------------------------------------

--
-- Table structure for table `crarity`
--

CREATE TABLE `crarity` (
  `IDRarity` int(11) NOT NULL,
  `RarityName` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `crarity`
--

INSERT INTO `crarity` (`IDRarity`, `RarityName`) VALUES
(1, 'Consumer Grade'),
(2, 'Industrial Grade'),
(3, 'Mil-Spec'),
(4, 'Restricted'),
(5, 'Classified'),
(6, 'Covert'),
(7, 'Special');

-- --------------------------------------------------------

--
-- Table structure for table `cskins`
--

CREATE TABLE `cskins` (
  `IDSkin` int(11) NOT NULL,
  `SkinName` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `SkinImage` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `cskins`
--

INSERT INTO `cskins` (`IDSkin`, `SkinName`, `SkinImage`) VALUES
(1, 'Glock-18 | Catacombs', 'Glock-18_Catacombs.webp'),
(2, 'M249 | System Lock', 'M249_System Lock.webp'),
(3, 'MP9 | Deadly Poison', 'MP9_Deadly Poison.webp'),
(4, 'SCAR-20 | Grotto', 'SCAR-20_Grotto.webp'),
(5, 'XM1014 | Quicksilver', 'XM1014_Quicksilver.webp'),
(6, 'Dual Berettas | Urban Shock', 'Dual Berettas_Urban Shock.webp'),
(7, 'Desert Eagle | Naga', 'Desert Eagle_Naga.webp'),
(8, 'MAC-10 | Malachite', 'MAC-10_Malachite.webp'),
(9, 'Sawed-Off | Serenity', 'Sawed-Off_Serenity.webp'),
(10, 'AK-47 | Cartel', 'AK-47_Cartel.webp'),
(11, 'M4A4 | (Dragon King)', 'M4A4_(Dragon King).webp'),
(12, 'P250 | Muertos', 'P250_Muertos.webp'),
(13, 'AWP | Man-o\'-war', 'AWP_Man-o\'-war.webp'),
(14, 'Galil AR | Chatterbox', 'Galil AR_Chatterbox.webp'),
(15, 'M9 Bayonet | Tiger Tooth', 'M9 Bayonet_Tiger Tooth.webp'),
(16, 'M9 Bayonet | Ultraviolet', 'M9 Bayonet_Ultraviolet.webp'),
(17, 'M9 Bayonet | Doppler', 'M9 Bayonet_Doppler.webp'),
(18, 'M9 Bayonet | Marble Fade', 'M9 Bayonet_Marble Fade.webp'),
(19, 'AK-47 | Elite Build', 'AK-47_Elite Build.webp'),
(20, 'MP7 | Armor Core', 'MP7_Armor Core.webp'),
(21, 'Desert Eagle | Bronze Deco', 'Desert Eagle_Bronze Deco.webp'),
(22, 'P250 | Valence', 'P250_Valence.webp'),
(23, 'Negev | Man-o\'-war', 'Negev_Man-o\'-war.webp'),
(24, 'Sawed-Off | Origami', 'Sawed-Off_Origami.webp'),
(25, 'AWP | Worm God', 'AWP_Worm God.webp'),
(26, 'MAG-7 | Heat', 'MAG-7_Heat.webp'),
(27, 'CZ75-Auto | Pole Position', 'CZ75-Auto_Pole Position.webp'),
(28, 'UMP-45 | Grand Prix', 'UMP-45_Grand Prix.webp'),
(29, 'Five-SeveN | Monkey Business', 'Five-SeveN_Monkey Business.webp'),
(30, 'Galil AR | Eco', 'Galil AR_Eco.webp'),
(31, 'FAMAS | Djinn', 'FAMAS_Djinn.webp'),
(32, 'M4A1-S | Hyper Beast', 'M4A1-S_Hyper Beast.webp'),
(33, 'MAC-10 | Neon Rider', 'MAC-10_Neon Rider.webp'),
(34, 'M9 Bayonet | Tiger Tooth', 'M9 Bayonet_Tiger Tooth.webp'),
(35, 'M9 Bayonet | Ultraviolet', 'M9 Bayonet_Ultraviolet.webp'),
(36, 'M9 Bayonet | Doppler', 'M9 Bayonet_Doppler.webp'),
(37, 'M9 Bayonet | Marble Fade', 'M9 Bayonet_Marble Fade.webp'),
(38, 'G3SG1 | Orange Crash', 'G3SG1_Orange Crash.webp'),
(39, 'Dual Berettas | Ventilators', 'Dual Berettas_Ventilators.webp'),
(40, 'M249 | Spectre', 'M249_Spectre.webp'),
(41, 'MP9 | Bioleak', 'MP9_Bioleak.webp'),
(42, 'P2000 | Oceanic', 'P2000_Oceanic.webp'),
(43, 'Sawed-Off | Fubar', 'Sawed-Off_Fubar.webp'),
(44, 'SG 553 | Atlas', 'SG 553_Atlas.webp'),
(45, 'CZ75-Auto | Red Astor', 'CZ75-Auto_Red Astor.webp'),
(46, 'Galil AR | Firefight', 'Galil AR_Firefight.webp'),
(47, 'SSG 08 | Ghost Crusader', 'SSG 08_Ghost Crusader.webp'),
(48, 'Tec-9 | Re-Entry', 'Tec-9_Re-Entry.webp'),
(49, 'XM1014 | Black Tie', 'XM1014_Black Tie.webp'),
(50, 'AUG | Fleet Flock', 'AUG_Fleet Flock.webp'),
(51, 'P250 | Asiimov', 'P250_Asiimov.webp'),
(52, 'UMP-45 | Primal Saber', 'UMP-45_Primal Saber.webp'),
(53, 'PP-Bizon | Judgement of Anubis', 'PP-Bizon_Judgement of Anubis.webp'),
(54, 'M4A1-S | Chantico\'s Fire', 'M4A1-S_Chantico\'s Fire.webp'),
(55, 'M9 Bayonet | Tiger Tooth', 'M9 Bayonet_Tiger Tooth.webp'),
(56, 'M9 Bayonet | Ultraviolet', 'M9 Bayonet_Ultraviolet.webp'),
(57, 'M9 Bayonet | Doppler', 'M9 Bayonet_Doppler.webp'),
(58, 'M9 Bayonet | Marble Fade', 'M9 Bayonet_Marble Fade.webp');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `IDOwner` int(11) NOT NULL,
  `IDItem` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`IDOwner`, `IDItem`, `Amount`) VALUES
(1, 1, 3),
(1, 2, 2),
(1, 205, 1),
(2, 8, 1),
(2, 11, 1),
(2, 12, 1),
(2, 25, 1),
(2, 43, 1),
(2, 44, 2),
(2, 201, 1);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `IDItem` int(11) NOT NULL,
  `IDSkin` int(11) NOT NULL,
  `IDRarity` int(11) NOT NULL,
  `IDQuality` int(11) NOT NULL,
  `ItemPrice` int(11) NOT NULL,
  `IDCase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`IDItem`, `IDSkin`, `IDRarity`, `IDQuality`, `ItemPrice`, `IDCase`) VALUES
(1, 1, 3, 1, 108, 1),
(2, 1, 3, 2, 54, 1),
(3, 1, 3, 3, 21, 1),
(4, 1, 3, 4, 31, 1),
(5, 1, 3, 5, 51, 1),
(6, 2, 3, 1, 15, 1),
(7, 2, 3, 2, 22, 1),
(8, 2, 3, 3, 41, 1),
(9, 2, 3, 4, 30, 1),
(10, 2, 3, 5, 93, 1),
(11, 3, 3, 1, 16, 1),
(12, 3, 3, 2, 16, 1),
(13, 3, 3, 3, 22, 1),
(14, 3, 3, 4, 36, 1),
(15, 3, 3, 5, 140, 1),
(16, 4, 3, 1, 36, 1),
(17, 4, 3, 2, 18, 1),
(18, 4, 3, 3, 17, 1),
(19, 4, 3, 4, 22, 1),
(20, 4, 3, 5, 36, 1),
(21, 5, 3, 1, 14, 1),
(22, 5, 3, 2, 14, 1),
(23, 5, 3, 3, 14, 1),
(24, 5, 3, 4, 21, 1),
(25, 5, 3, 5, 36, 1),
(26, 6, 4, 1, 91, 1),
(27, 6, 4, 2, 88, 1),
(28, 6, 4, 3, 91, 1),
(29, 6, 4, 4, 138, 1),
(30, 6, 4, 5, 205, 1),
(31, 7, 4, 1, 103, 1),
(32, 7, 4, 2, 105, 1),
(33, 7, 4, 3, 111, 1),
(34, 7, 4, 4, 203, 1),
(35, 7, 4, 5, 522, 1),
(36, 8, 4, 1, 83, 1),
(37, 8, 4, 2, 109, 1),
(38, 8, 4, 3, 103, 1),
(39, 8, 4, 4, 139, 1),
(40, 8, 4, 5, 214, 1),
(41, 9, 4, 1, 87, 1),
(42, 9, 4, 2, 79, 1),
(43, 9, 4, 3, 86, 1),
(44, 9, 4, 4, 125, 1),
(45, 9, 4, 5, 195, 1),
(46, 10, 5, 1, 614, 1),
(47, 10, 5, 2, 903, 1),
(48, 10, 5, 3, 574, 1),
(49, 10, 5, 4, 745, 1),
(50, 10, 5, 5, 1407, 1),
(51, 11, 5, 1, 453, 1),
(52, 11, 5, 2, 689, 1),
(53, 11, 5, 3, 483, 1),
(54, 11, 5, 4, 936, 1),
(55, 11, 5, 5, 2090, 1),
(56, 12, 5, 1, 373, 1),
(57, 12, 5, 2, 403, 1),
(58, 12, 5, 3, 381, 1),
(59, 12, 5, 4, 469, 1),
(60, 12, 5, 5, 891, 1),
(61, 13, 6, 3, 2917, 1),
(62, 13, 6, 4, 3240, 1),
(63, 14, 6, 1, 586, 1),
(64, 14, 6, 2, 1033, 1),
(65, 14, 6, 3, 5038, 1),
(66, 15, 7, 4, 65552, 1),
(67, 15, 7, 5, 71919, 1),
(70, 16, 7, 1, 26634, 1),
(71, 16, 7, 2, 27787, 1),
(72, 16, 7, 3, 30177, 1),
(73, 16, 7, 4, 43439, 1),
(74, 16, 7, 5, 60336, 1),
(68, 17, 7, 4, 60454, 1),
(69, 17, 7, 5, 67263, 1),
(75, 18, 7, 4, 84530, 1),
(76, 18, 7, 5, 104870, 1),
(77, 19, 3, 1, 128, 2),
(78, 19, 3, 2, 138, 2),
(79, 19, 3, 3, 170, 2),
(80, 19, 3, 4, 242, 2),
(81, 19, 3, 5, 580, 2),
(82, 20, 3, 1, 30, 2),
(83, 20, 3, 2, 11, 2),
(84, 20, 3, 3, 10, 2),
(85, 20, 3, 4, 14, 2),
(86, 20, 3, 5, 26, 2),
(87, 21, 3, 1, 70, 2),
(88, 21, 3, 2, 16, 2),
(89, 21, 3, 3, 11, 2),
(90, 21, 3, 4, 25, 2),
(91, 21, 3, 5, 45, 2),
(92, 22, 3, 1, 10, 2),
(93, 22, 3, 2, 18, 2),
(94, 22, 3, 3, 11, 2),
(95, 22, 3, 4, 19, 2),
(96, 22, 3, 5, 64, 2),
(97, 23, 3, 3, 12, 2),
(98, 23, 3, 4, 13, 2),
(99, 24, 3, 1, 10, 2),
(100, 24, 3, 2, 15, 2),
(101, 24, 3, 3, 11, 2),
(102, 24, 3, 4, 16, 2),
(103, 24, 3, 5, 29, 2),
(104, 25, 4, 2, 144, 2),
(105, 25, 4, 3, 125, 2),
(106, 25, 4, 4, 148, 2),
(107, 25, 4, 5, 229, 2),
(108, 26, 4, 1, 33, 2),
(109, 26, 4, 2, 32, 2),
(110, 26, 4, 3, 34, 2),
(111, 26, 4, 4, 64, 2),
(112, 26, 4, 5, 241, 2),
(113, 27, 4, 1, 32, 2),
(114, 27, 4, 2, 63, 2),
(115, 27, 4, 3, 33, 2),
(116, 27, 4, 4, 65, 2),
(117, 27, 4, 5, 137, 2),
(118, 28, 4, 3, 32, 2),
(119, 29, 5, 1, 200, 2),
(120, 29, 5, 2, 202, 2),
(121, 29, 5, 3, 233, 2),
(122, 29, 5, 4, 965, 2),
(123, 30, 5, 1, 210, 2),
(124, 30, 5, 2, 246, 2),
(125, 30, 5, 3, 425, 2),
(126, 30, 5, 4, 2136, 2),
(127, 31, 5, 1, 197, 2),
(128, 31, 5, 2, 193, 2),
(129, 31, 5, 3, 221, 2),
(130, 31, 5, 4, 413, 2),
(131, 31, 5, 5, 1141, 2),
(132, 32, 6, 1, 1471, 2),
(133, 32, 6, 2, 1822, 2),
(134, 32, 6, 3, 2542, 2),
(135, 32, 6, 4, 5133, 2),
(136, 32, 6, 5, 11752, 2),
(137, 33, 6, 2, 612, 2),
(138, 33, 6, 3, 614, 2),
(139, 33, 6, 4, 744, 2),
(140, 33, 6, 5, 1106, 2),
(141, 34, 7, 4, 65552, 2),
(142, 34, 7, 5, 71919, 2),
(145, 35, 7, 1, 26634, 2),
(146, 35, 7, 2, 27787, 2),
(147, 35, 7, 3, 30177, 2),
(148, 35, 7, 4, 43439, 2),
(149, 35, 7, 5, 60336, 2),
(143, 36, 7, 4, 60454, 2),
(144, 36, 7, 5, 67263, 2),
(150, 37, 7, 4, 84530, 2),
(151, 37, 7, 5, 104870, 2),
(152, 38, 3, 1, 7, 3),
(153, 38, 3, 2, 7, 3),
(154, 38, 3, 3, 6, 3),
(155, 38, 3, 4, 11, 3),
(156, 38, 3, 5, 25, 3),
(157, 39, 3, 2, 10, 3),
(158, 39, 3, 3, 7, 3),
(159, 39, 3, 4, 13, 3),
(160, 39, 3, 5, 26, 3),
(161, 40, 3, 1, 9, 3),
(162, 40, 3, 2, 9, 3),
(163, 40, 3, 3, 7, 3),
(164, 40, 3, 4, 13, 3),
(165, 40, 3, 5, 26, 3),
(166, 41, 3, 1, 11, 3),
(167, 41, 3, 2, 14, 3),
(168, 41, 3, 3, 10, 3),
(169, 41, 3, 4, 18, 3),
(170, 41, 3, 5, 34, 3),
(171, 42, 3, 1, 6, 3),
(172, 42, 3, 2, 10, 3),
(173, 42, 3, 3, 7, 3),
(174, 42, 3, 4, 12, 3),
(175, 42, 3, 5, 26, 3),
(176, 43, 3, 1, 6, 3),
(177, 43, 3, 2, 9, 3),
(178, 44, 3, 1, 6, 3),
(179, 44, 3, 2, 9, 3),
(180, 44, 3, 3, 6, 3),
(181, 44, 3, 4, 10, 3),
(182, 44, 3, 5, 32, 3),
(183, 45, 4, 1, 31, 3),
(184, 45, 4, 2, 32, 3),
(185, 45, 4, 3, 33, 3),
(186, 45, 4, 4, 59, 3),
(187, 45, 4, 5, 133, 3),
(188, 46, 4, 1, 31, 3),
(189, 46, 4, 2, 32, 3),
(190, 46, 4, 3, 34, 3),
(191, 46, 4, 4, 63, 3),
(192, 46, 4, 5, 164, 3),
(193, 47, 4, 1, 35, 3),
(194, 47, 4, 2, 37, 3),
(195, 47, 4, 3, 46, 3),
(196, 47, 4, 4, 125, 3),
(197, 47, 4, 5, 334, 3),
(198, 48, 4, 2, 50, 3),
(199, 48, 4, 3, 33, 3),
(200, 48, 4, 4, 60, 3),
(201, 48, 4, 5, 122, 3),
(202, 49, 4, 1, 33, 3),
(203, 49, 4, 2, 36, 3),
(204, 49, 4, 3, 34, 3),
(205, 49, 4, 4, 78, 3),
(206, 49, 4, 5, 194, 3),
(207, 50, 5, 1, 193, 3),
(208, 50, 5, 2, 188, 3),
(209, 50, 5, 3, 258, 3),
(210, 50, 5, 4, 432, 3),
(211, 50, 5, 5, 956, 3),
(212, 51, 5, 1, 229, 3),
(213, 51, 5, 2, 341, 3),
(214, 51, 5, 3, 400, 3),
(215, 51, 5, 4, 1902, 3),
(216, 52, 5, 1, 202, 3),
(217, 52, 5, 2, 258, 3),
(218, 52, 5, 3, 261, 3),
(219, 52, 5, 4, 443, 3),
(220, 52, 5, 5, 876, 3),
(221, 53, 6, 1, 396, 3),
(222, 53, 6, 2, 438, 3),
(223, 53, 6, 3, 444, 3),
(224, 53, 6, 4, 623, 3),
(225, 53, 6, 5, 890, 3),
(226, 54, 6, 1, 1705, 3),
(227, 54, 6, 2, 2252, 3),
(228, 54, 6, 3, 3039, 3),
(229, 54, 6, 4, 5415, 3),
(230, 54, 6, 5, 11207, 3),
(231, 55, 7, 4, 65552, 3),
(232, 55, 7, 5, 71919, 3),
(235, 56, 7, 1, 26634, 3),
(236, 56, 7, 2, 27787, 3),
(237, 56, 7, 3, 30177, 3),
(238, 56, 7, 4, 43439, 3),
(239, 56, 7, 5, 60336, 3),
(233, 57, 7, 4, 60454, 3),
(234, 57, 7, 5, 67263, 3),
(240, 58, 7, 4, 84530, 3),
(241, 58, 7, 5, 104870, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`IDCase`),
  ADD UNIQUE KEY `IDCase` (`IDCase`);

--
-- Indexes for table `cowner`
--
ALTER TABLE `cowner`
  ADD PRIMARY KEY (`IDOwner`);

--
-- Indexes for table `cquality`
--
ALTER TABLE `cquality`
  ADD PRIMARY KEY (`IDQuality`);

--
-- Indexes for table `crarity`
--
ALTER TABLE `crarity`
  ADD PRIMARY KEY (`IDRarity`);

--
-- Indexes for table `cskins`
--
ALTER TABLE `cskins`
  ADD PRIMARY KEY (`IDSkin`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`IDOwner`,`IDItem`) USING BTREE,
  ADD KEY `IDItem` (`IDItem`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD UNIQUE KEY `PK_item` (`IDSkin`,`IDRarity`,`IDQuality`) USING BTREE,
  ADD UNIQUE KEY `IDItem` (`IDItem`),
  ADD KEY `IDRarity` (`IDRarity`),
  ADD KEY `IDQuality` (`IDQuality`),
  ADD KEY `IDCase` (`IDCase`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `IDCase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `cowner`
--
ALTER TABLE `cowner`
  MODIFY `IDOwner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `cquality`
--
ALTER TABLE `cquality`
  MODIFY `IDQuality` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `crarity`
--
ALTER TABLE `crarity`
  MODIFY `IDRarity` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cskins`
--
ALTER TABLE `cskins`
  MODIFY `IDSkin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`IDItem`) REFERENCES `item` (`IDItem`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `inventory_ibfk_4` FOREIGN KEY (`IDOwner`) REFERENCES `cowner` (`IDOwner`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_5` FOREIGN KEY (`IDSkin`) REFERENCES `cskins` (`IDSkin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `item_ibfk_6` FOREIGN KEY (`IDRarity`) REFERENCES `crarity` (`IDRarity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `item_ibfk_7` FOREIGN KEY (`IDQuality`) REFERENCES `cquality` (`IDQuality`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `item_ibfk_8` FOREIGN KEY (`IDCase`) REFERENCES `cases` (`IDCase`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
