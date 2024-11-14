-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2024 at 01:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monit_har_amr`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_survei`
--

CREATE TABLE `data_survei` (
  `id_data_survei` int(11) NOT NULL,
  `id_pel` varchar(50) NOT NULL,
  `tanggal_pemeriksaan` date DEFAULT curdate(),
  `nama` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `tarif` varchar(50) NOT NULL,
  `daya` int(11) NOT NULL,
  `fakm` decimal(10,2) NOT NULL,
  `merk_meter` varchar(50) NOT NULL,
  `tipe_meter` varchar(50) NOT NULL,
  `no_meter` varchar(50) NOT NULL,
  `maps` varchar(255) DEFAULT NULL,
  `lwbp` decimal(10,2) DEFAULT NULL,
  `wbp` decimal(10,2) DEFAULT NULL,
  `bp` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `kvarh` decimal(10,2) DEFAULT NULL,
  `merk_cb_mccb` varchar(50) DEFAULT NULL,
  `tipe_cb_mccb` varchar(100) NOT NULL,
  `merk_ct` varchar(50) DEFAULT NULL,
  `penggantian_modem` enum('ya','tidak') DEFAULT NULL,
  `no_meter_update` varchar(50) DEFAULT NULL,
  `merk_modem` varchar(50) DEFAULT NULL,
  `tipe_modem` varchar(50) DEFAULT NULL,
  `imei_modem` varchar(50) DEFAULT NULL,
  `simcard` varchar(50) DEFAULT NULL,
  `ip_access` varchar(50) DEFAULT NULL,
  `foto_phasor` varchar(255) DEFAULT NULL,
  `foto_app` varchar(255) DEFAULT NULL,
  `foto_meter` varchar(255) DEFAULT NULL,
  `foto_ct` varchar(255) DEFAULT NULL,
  `foto_cb_mccb` varchar(255) DEFAULT NULL,
  `foto_ba` varchar(255) DEFAULT NULL,
  `shuntrip` enum('ada','tidak') DEFAULT NULL,
  `foto_segel` varchar(255) DEFAULT NULL,
  `error_kwh_persen` decimal(5,2) DEFAULT NULL,
  `kode_permasalahan` int(11) DEFAULT NULL,
  `kode_perbaikan` int(11) DEFAULT NULL,
  `petugas` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `kode_pelanggan` int(11) NOT NULL,
  `id_pel` int(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `alamat` varchar(150) DEFAULT NULL,
  `no_kunci` int(25) DEFAULT NULL,
  `tarif` varchar(25) DEFAULT NULL,
  `daya` int(100) DEFAULT NULL,
  `fakm` int(50) DEFAULT NULL,
  `merk_meter` varchar(100) DEFAULT NULL,
  `tipe_meter` varchar(100) DEFAULT NULL,
  `no_meter` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`kode_pelanggan`, `id_pel`, `nama`, `alamat`, `no_kunci`, `tarif`, `daya`, `fakm`, `merk_meter`, `tipe_meter`, `no_meter`) VALUES
(3, 2147483647, 'PT BHAKTI IDOLA TAMA', 'JL MAYJEND.SUNGKONO', 339, 'B2', 53000, 20, 'ITRON', 'NIAS CT', 2147483647),
(4, 2147483647, 'PT KEBOMAS MAKMUR', 'JL PERGUDANGAN AKSES KEBOMAS BLOK E', 0, 'R3', 6600, 1, 'WASION', 'iMETER 310', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `perbaikan`
--

CREATE TABLE `perbaikan` (
  `id_perbaikan` int(11) NOT NULL,
  `jenis_perbaikan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perbaikan`
--

INSERT INTO `perbaikan` (`id_perbaikan`, `jenis_perbaikan`) VALUES
(2, 'GANTI MODEM SET DAN SIMCARD'),
(3, 'GANTI MODEM SET (MODEM,POWER SUPLLY,KABEL PORT MODEM)'),
(4, 'GANTI ANTENA'),
(5, 'GANTI KABEL PORT MODEM'),
(6, 'GANTI SIMCARD'),
(7, 'GANTI POWER SUPLLY'),
(8, 'RESTART MODEM'),
(9, 'GANTI MODEM');

-- --------------------------------------------------------

--
-- Table structure for table `permasalahan`
--

CREATE TABLE `permasalahan` (
  `id_permasalahan` int(11) NOT NULL,
  `jenis_permasalahan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permasalahan`
--

INSERT INTO `permasalahan` (`id_permasalahan`, `jenis_permasalahan`) VALUES
(2, 'PORT METER RUSAK'),
(3, 'MODEM ERROR'),
(4, 'SIMCARD ERROR'),
(5, 'POWER SUPLLY ERROR'),
(6, 'KABEL PORT MODEM PUTUS'),
(7, 'ANTENA PUTUS'),
(8, 'AMR BARU');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` enum('1','2') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `nama_user`, `password`, `role`) VALUES
(1, 'fitriaevi', 'Fitria Evi Susana', '$2b$10$FGPlARicxpQSFgyiaEmBN.DwFbHMVFNFij7yT5a5koi', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_survei`
--
ALTER TABLE `data_survei`
  ADD PRIMARY KEY (`id_data_survei`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`kode_pelanggan`);

--
-- Indexes for table `perbaikan`
--
ALTER TABLE `perbaikan`
  ADD PRIMARY KEY (`id_perbaikan`);

--
-- Indexes for table `permasalahan`
--
ALTER TABLE `permasalahan`
  ADD PRIMARY KEY (`id_permasalahan`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_survei`
--
ALTER TABLE `data_survei`
  MODIFY `id_data_survei` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `kode_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `perbaikan`
--
ALTER TABLE `perbaikan`
  MODIFY `id_perbaikan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `permasalahan`
--
ALTER TABLE `permasalahan`
  MODIFY `id_permasalahan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
