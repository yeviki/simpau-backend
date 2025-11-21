-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2025 at 11:33 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `syst_menu`
--

CREATE TABLE `syst_menu` (
  `id_menu` smallint(6) NOT NULL,
  `title_menu` varchar(255) DEFAULT NULL,
  `url_menu` varchar(255) DEFAULT NULL,
  `icon_menu` varchar(255) DEFAULT NULL,
  `order_menu` smallint(6) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `create_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `syst_menu`
--

INSERT INTO `syst_menu` (`id_menu`, `title_menu`, `url_menu`, `icon_menu`, `order_menu`, `parent_id`, `create_by`) VALUES
(1, 'Dashboard', 'dashboard', 'LayoutDashboard', 1, 0, 'yeviki');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `role`) VALUES
(1, 'yeviki', 'yeviki@gmail.com', '$2b$10$par5gPiQvifrKDtC7Aq0/O3hs.W9FNuwoKOJkfGllSjpxInDUIXZm', '2025-11-18 03:41:13', 'adminsuper'),
(2, 'Admin Super', 'admin@gmail.com', '$2b$10$HyoaU9NaVVbNuSD3v2HN8O2x/yobOaOQAoGtadCEVRxX3oDrswKU2', '2025-11-18 05:16:54', 'adminsuper'),
(5, 'Saya Super', 'saya@gmail.com', '$2b$10$.hbDI.eUbKXy1bFZlkAxs.CWIozQB7AIG4pSFTWV0AofsYOw4ebl6', '2025-11-19 02:50:33', 'adminsuper'),
(8, 'test', 'test@gmail.com', '$2b$10$xGjtIchHxfC77CP7h/yH/OIm8olvl02KJD/0hWY1LByIctfZeA8Hi', '2025-11-19 08:16:43', 'pimpinan'),
(9, 'testing', 'testing@gmail.com', '$2b$10$.bI4kONMrXjZuKB5fX4kEedYeHAPZD78aSAozDR8gq6v532bpl7Fa', '2025-11-19 08:38:29', 'adminlocal'),
(14, 'test1', 'test1@gmail.com', '$2b$10$sK2rFKbSF/exqxf6YqfxWOYbbiKhqLJTjQoVKC77XT3Vqef9mVMH.', '2025-11-20 06:27:30', 'adminlocal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `syst_menu`
--
ALTER TABLE `syst_menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
