-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2025 at 08:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `danielle_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_tbl`
--

CREATE TABLE `enrollment_tbl` (
  `enroll_id` int(11) NOT NULL,
  `stud_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `date_enrolled` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment_tbl`
--

INSERT INTO `enrollment_tbl` (`enroll_id`, `stud_id`, `subject_id`, `date_enrolled`) VALUES
(1, 2, 2, '2025-09-16 13:32:14'),
(2, 2, 4, '2025-09-16 13:36:20'),
(3, 5, 3, '2025-09-16 13:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `institute_tbl`
--

CREATE TABLE `institute_tbl` (
  `ins_id` int(11) NOT NULL,
  `ins_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `institute_tbl`
--

INSERT INTO `institute_tbl` (`ins_id`, `ins_name`) VALUES
(1, 'College of Engineering'),
(2, 'College of Information Technology'),
(3, 'College of Business'),
(4, 'College of Education'),
(5, 'College of Arts and Sciences');

-- --------------------------------------------------------

--
-- Table structure for table `program_tbl`
--

CREATE TABLE `program_tbl` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(100) DEFAULT NULL,
  `ins_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `program_tbl`
--

INSERT INTO `program_tbl` (`program_id`, `program_name`, `ins_id`) VALUES
(1, 'BS Civil Engineering', 1),
(2, 'BS Computer Science', 2),
(3, 'BS Information Systems', 3),
(4, 'BS Accountancy', 4),
(5, 'BSEd Major in Math', 5);

-- --------------------------------------------------------

--
-- Table structure for table `semester_tbl`
--

CREATE TABLE `semester_tbl` (
  `sem_id` int(11) NOT NULL,
  `sem_name` varchar(50) DEFAULT NULL,
  `year_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `semester_tbl`
--

INSERT INTO `semester_tbl` (`sem_id`, `sem_name`, `year_id`) VALUES
(1, '1st Semester', 1),
(2, '2nd Semester', 1),
(3, '1st Semester', 2),
(4, '2nd Semester', 2),
(5, 'Summer', 2);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_above_avg_all`
-- (See below for the actual view)
--
CREATE TABLE `students_above_avg_all` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_accountancy`
-- (See below for the actual view)
--
CREATE TABLE `students_accountancy` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_bsed`
-- (See below for the actual view)
--
CREATE TABLE `students_bsed` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_civilengineering`
-- (See below for the actual view)
--
CREATE TABLE `students_civilengineering` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_computerscience`
-- (See below for the actual view)
--
CREATE TABLE `students_computerscience` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `students_informationsystems`
-- (See below for the actual view)
--
CREATE TABLE `students_informationsystems` (
);

-- --------------------------------------------------------

--
-- Table structure for table `student_allowance`
--

CREATE TABLE `student_allowance` (
  `student_id` int(11) NOT NULL,
  `Allowance_Percentage` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_allowance`
--

INSERT INTO `student_allowance` (`student_id`, `Allowance_Percentage`) VALUES
(26, 500),
(27, 300),
(2025, 300),
(2276, 300);

-- --------------------------------------------------------

--
-- Table structure for table `student_load`
--

CREATE TABLE `student_load` (
  `load_id` int(11) NOT NULL,
  `stud_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student_load`
--

INSERT INTO `student_load` (`load_id`, `stud_id`, `subject_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 1),
(5, 4, 4);

-- --------------------------------------------------------

--
-- Stand-in structure for view `student_names`
-- (See below for the actual view)
--
CREATE TABLE `student_names` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `student_program`
-- (See below for the actual view)
--
CREATE TABLE `student_program` (
);

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

CREATE TABLE `student_tbl` (
  `stud_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `program_id` int(11) DEFAULT NULL,
  `ALLOWANCE` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`stud_id`, `first_name`, `middle_name`, `last_name`, `program_id`, `ALLOWANCE`) VALUES
(1, 'Bianca ', 'Carmin', 'Santos', 3, 3500),
(2, 'Cedric', 'Fajardo', 'Umali', 2, 3000),
(3, 'Anna', 'Navarro', 'Garcia', 1, 1500),
(4, 'John', 'Mendoza', 'Panopio', 4, 2300),
(5, 'Maria', 'Agillon', 'Ramos', 5, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `stud_history`
--

CREATE TABLE `stud_history` (
  `history_stud_id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `program_id` int(10) NOT NULL,
  `allowance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stud_history`
--

INSERT INTO `stud_history` (`history_stud_id`, `name`, `program_id`, `allowance`) VALUES
(1, 'Bianca Santos', 3, 2500),
(2, 'Cedric Umali', 2, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE `subject_tbl` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) DEFAULT NULL,
  `sem_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`subject_id`, `subject_name`, `sem_id`) VALUES
(1, 'Introduction to Programming', 1),
(2, 'Data Structures', 2),
(3, 'Database Management', 3),
(4, 'Accounting Principles', 4),
(5, 'Educational Psychology', 5);

-- --------------------------------------------------------

--
-- Table structure for table `year_tbl`
--

CREATE TABLE `year_tbl` (
  `year_id` int(11) NOT NULL,
  `year_from` int(11) DEFAULT NULL,
  `year_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `year_tbl`
--

INSERT INTO `year_tbl` (`year_id`, `year_from`, `year_to`) VALUES
(1, 2023, 2024),
(2, 2024, 2025),
(3, 2025, 2026),
(4, 2026, 2027),
(5, 2027, 2028);

-- --------------------------------------------------------

--
-- Structure for view `students_above_avg_all`
--
DROP TABLE IF EXISTS `students_above_avg_all`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_above_avg_all`  AS SELECT `student_tbl`.`stud_id` AS `stud_id`, `student_tbl`.`name` AS `name`, `student_tbl`.`program_id` AS `program_id`, `student_tbl`.`ALLOWANCE` AS `allowance` FROM `student_tbl` WHERE `student_tbl`.`ALLOWANCE` > (select avg(`student_tbl`.`ALLOWANCE`) from `student_tbl`) ;

-- --------------------------------------------------------

--
-- Structure for view `students_accountancy`
--
DROP TABLE IF EXISTS `students_accountancy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_accountancy`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) WHERE `p`.`program_name` = 'BS Accountancy' ;

-- --------------------------------------------------------

--
-- Structure for view `students_bsed`
--
DROP TABLE IF EXISTS `students_bsed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_bsed`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) WHERE `p`.`program_name` = 'BSEd Major in Math' ;

-- --------------------------------------------------------

--
-- Structure for view `students_civilengineering`
--
DROP TABLE IF EXISTS `students_civilengineering`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_civilengineering`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) WHERE `p`.`program_name` = 'BS Civil Engineering' ;

-- --------------------------------------------------------

--
-- Structure for view `students_computerscience`
--
DROP TABLE IF EXISTS `students_computerscience`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_computerscience`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) WHERE `p`.`program_name` = 'BS Computer Science' ;

-- --------------------------------------------------------

--
-- Structure for view `students_informationsystems`
--
DROP TABLE IF EXISTS `students_informationsystems`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `students_informationsystems`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) WHERE `p`.`program_name` = 'BS Information Systems' ;

-- --------------------------------------------------------

--
-- Structure for view `student_names`
--
DROP TABLE IF EXISTS `student_names`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_names`  AS SELECT `student_tbl`.`name` AS `name` FROM `student_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `student_program`
--
DROP TABLE IF EXISTS `student_program`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_program`  AS SELECT `s`.`stud_id` AS `stud_id`, `s`.`name` AS `name`, `p`.`program_name` AS `program_name` FROM (`student_tbl` `s` join `program_tbl` `p` on(`s`.`program_id` = `p`.`program_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enrollment_tbl`
--
ALTER TABLE `enrollment_tbl`
  ADD PRIMARY KEY (`enroll_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `fk_enroll_program` (`subject_id`);

--
-- Indexes for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indexes for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `ins_id` (`ins_id`);

--
-- Indexes for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD PRIMARY KEY (`sem_id`),
  ADD KEY `year_id` (`year_id`);

--
-- Indexes for table `student_allowance`
--
ALTER TABLE `student_allowance`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_load`
--
ALTER TABLE `student_load`
  ADD PRIMARY KEY (`load_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD PRIMARY KEY (`stud_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `stud_history`
--
ALTER TABLE `stud_history`
  ADD PRIMARY KEY (`history_stud_id`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `sem_id` (`sem_id`);

--
-- Indexes for table `year_tbl`
--
ALTER TABLE `year_tbl`
  ADD PRIMARY KEY (`year_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollment_tbl`
--
ALTER TABLE `enrollment_tbl`
  ADD CONSTRAINT `enrollment_tbl_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`stud_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_enroll_program` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD CONSTRAINT `program_tbl_ibfk_1` FOREIGN KEY (`ins_id`) REFERENCES `institute_tbl` (`ins_id`);

--
-- Constraints for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD CONSTRAINT `semester_tbl_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_tbl` (`year_id`);

--
-- Constraints for table `student_load`
--
ALTER TABLE `student_load`
  ADD CONSTRAINT `student_load_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`stud_id`),
  ADD CONSTRAINT `student_load_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `student_tbl_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program_tbl` (`program_id`);

--
-- Constraints for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD CONSTRAINT `subject_tbl_ibfk_1` FOREIGN KEY (`sem_id`) REFERENCES `semester_tbl` (`sem_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
