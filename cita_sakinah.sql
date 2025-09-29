/*
 Navicat Premium Dump SQL

 Source Server         : docker_cita_sakinah
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44)
 Source Host           : localhost:3906
 Source Schema         : cita_sakinah

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44)
 File Encoding         : 65001

 Date: 01/01/2025 18:23:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fasilitas
-- ----------------------------
DROP TABLE IF EXISTS `fasilitas`;
CREATE TABLE `fasilitas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaFasilitas` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sekolahId` int(11) NOT NULL,
  `tanggalDibuat` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sekolahId`(`sekolahId`) USING BTREE,
  CONSTRAINT `fasilitas_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fasilitas
-- ----------------------------
INSERT INTO `fasilitas` VALUES (1, 'Ruang Kelas', 'file-faf8e110a529842bdeba880cad0db990eb4124.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (2, 'Ruang Pimpinan', 'file-bf2b64af387c86adddb5bc0ad1c335e14f7584.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (3, 'Ruang Guru', 'file-fda6938f6b23b2c7a3888170c7b993e1dff31d.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (4, 'Ruang Ibadah', 'file-e41e3271dc17fe5cda44db69c6a1f895693e97.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (5, 'Ruang Toilet', 'file-cc88a46d812239c8be4df03e61850728938699.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (6, 'Ruang Gudang', 'file-2b69cda14ebf662d23a2729c554dd8a0ebf75e.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (7, 'Ruang Bangunan', 'file-1d0d7f15d15998cb33c5ec70da0d80d461e626.png', 1, '2024-09-07');
INSERT INTO `fasilitas` VALUES (8, 'Ruang Toilet', 'file-4be4c4a2ab96a972a021247c7ae2446947e6.png', 2, '2024-09-07');
INSERT INTO `fasilitas` VALUES (9, 'Ruang Guru', 'file-a9b0b63ba611963d83858cf6c586dae8e7d9.png', 2, '2024-09-07');
INSERT INTO `fasilitas` VALUES (10, 'Ruang Kelas', 'file-4a666a36178a2d9056393cc24faeb4cf8ee2.png', 2, '2024-09-07');
INSERT INTO `fasilitas` VALUES (11, 'Ruang Bangunan', 'file-02a99200f30265a00094b4dfc5776de0e739.png', 2, '2024-09-07');
INSERT INTO `fasilitas` VALUES (12, 'Ruang Kelas', 'file-191b7fecdb5395ca649072d671296209ca04.png', 3, '2024-09-07');
INSERT INTO `fasilitas` VALUES (13, 'Ruang Guru', 'file-3422e0266e091c1c9d8fa194e8edb7150b42.png', 3, '2024-09-07');
INSERT INTO `fasilitas` VALUES (14, 'Taman Bermain', 'file-7afae2a290206b163511ae89a661e3d73634.png', 3, '2024-09-07');
INSERT INTO `fasilitas` VALUES (15, 'Ruang Toilet', 'file-db4165759d3b5e5176594939d261d433be09.png', 3, '2024-09-07');
INSERT INTO `fasilitas` VALUES (16, 'sdaasdasd1231', 'file-c55e05bd265073f1b84c7e.jpg', 2, '2024-09-10');
INSERT INTO `fasilitas` VALUES (17, 'Taman Bermain', 'file-9c2894ed9bc904b1c1dc7f.png', 1, '2024-09-10');
INSERT INTO `fasilitas` VALUES (18, 'Baca', 'file-45e9dbac39673dae7f.png', 1, '2024-09-11');
INSERT INTO `fasilitas` VALUES (19, 'asek', 'file-c202f5ea7aadba3e2b.png', 1, '2024-09-14');
INSERT INTO `fasilitas` VALUES (20, 'asek', 'file-e2a14dafef18f8073a.png', 1, '2024-09-14');

-- ----------------------------
-- Table structure for imageinformasi
-- ----------------------------
DROP TABLE IF EXISTS `imageinformasi`;
CREATE TABLE `imageinformasi`  (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `informasiId` int(11) NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idImage`) USING BTREE,
  INDEX `InformasiId`(`informasiId`) USING BTREE,
  CONSTRAINT `imageinformasi_ibfk_1` FOREIGN KEY (`informasiId`) REFERENCES `informasi` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imageinformasi
-- ----------------------------
INSERT INTO `imageinformasi` VALUES (33, 1, 'files-71abc49ad033a55ad7.png');
INSERT INTO `imageinformasi` VALUES (34, 1, 'files-95adc32548a09a4711.png');
INSERT INTO `imageinformasi` VALUES (35, 1, 'files-e41a8069758530c9891e411622c3ba51348965.png');
INSERT INTO `imageinformasi` VALUES (36, 4, 'files-3dbc5a509377a7d99ad4a94136156de6a49fe5.png');
INSERT INTO `imageinformasi` VALUES (37, 4, 'files-a234355b55cffc2cd4f2803358a7.jpg');
INSERT INTO `imageinformasi` VALUES (38, 4, 'files-173d995774a45c44.png');
INSERT INTO `imageinformasi` VALUES (39, 5, 'files-7de14fbd640b7aa01f1ec5e2.png');
INSERT INTO `imageinformasi` VALUES (40, 1, 'files-7b90bab6d8b2296e1f6097.jpg');
INSERT INTO `imageinformasi` VALUES (44, 6, 'files-2e5668c73248ca7dfc.png');

-- ----------------------------
-- Table structure for imagekegiatan
-- ----------------------------
DROP TABLE IF EXISTS `imagekegiatan`;
CREATE TABLE `imagekegiatan`  (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `kegiatanId` int(11) NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idImage`) USING BTREE,
  INDEX `kegiatanId`(`kegiatanId`) USING BTREE,
  CONSTRAINT `imagekegiatan_ibfk_1` FOREIGN KEY (`kegiatanId`) REFERENCES `kegiatan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagekegiatan
-- ----------------------------
INSERT INTO `imagekegiatan` VALUES (1, 1, 'files-0c6fb4a52784940f3815cd1fec1430d56ac259e16fb570.jpg');
INSERT INTO `imagekegiatan` VALUES (2, 1, 'files-18a03a0b20357c359eba7e1cd140472c0024365e5ab513.jpg');
INSERT INTO `imagekegiatan` VALUES (3, 1, 'files-c7f590e357f658405a16f0e11971f8b9121b62cbfc100b.jpg');
INSERT INTO `imagekegiatan` VALUES (4, 2, 'files-ce75770fee6bfe54072810ed53aff4d36118ba6272f080.jpg');
INSERT INTO `imagekegiatan` VALUES (5, 2, 'files-cfd4dd2732537385b9900ea481ae8d00f132d7340c6f25.jpg');
INSERT INTO `imagekegiatan` VALUES (6, 2, 'files-a31fc4d08c7db992737796ba74de4c4bc3416fc9ee164c.jpg');
INSERT INTO `imagekegiatan` VALUES (7, 3, 'files-5f630d65ce14f7b014bd95d9076624c91f340b02e5ee0b.jpg');
INSERT INTO `imagekegiatan` VALUES (8, 3, 'files-8bdba6cf4918aa1d28ddaaef15c1d2f6dcdaa5899adc64.jpg');
INSERT INTO `imagekegiatan` VALUES (9, 3, 'files-f67e1d573b6633016267e6d7cdbe02b0349b70ea07ea5c.jpg');
INSERT INTO `imagekegiatan` VALUES (18, 6, 'files-1df236e19a22004824.png');

-- ----------------------------
-- Table structure for informasi
-- ----------------------------
DROP TABLE IF EXISTS `informasi`;
CREATE TABLE `informasi`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of informasi
-- ----------------------------
INSERT INTO `informasi` VALUES (1, 'testing2232ss', '2024-09-11', '<p>asdkaoskdo</p>');
INSERT INTO `informasi` VALUES (4, 'testing2232ss', '2024-07-02', '<p>asdkaoskdo</p>');
INSERT INTO `informasi` VALUES (5, 'kjnjk', '2024-09-10', '<p>asda</p>');
INSERT INTO `informasi` VALUES (6, 'testing ', '2024-09-09', '<p>asda</p>');

-- ----------------------------
-- Table structure for kategorikegiatan
-- ----------------------------
DROP TABLE IF EXISTS `kategorikegiatan`;
CREATE TABLE `kategorikegiatan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaKegiatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kategorikegiatan
-- ----------------------------
INSERT INTO `kategorikegiatan` VALUES (1, 'Kegiatan Anak');
INSERT INTO `kategorikegiatan` VALUES (2, 'Kegiatan Guru');
INSERT INTO `kategorikegiatan` VALUES (3, 'Prestasi');

-- ----------------------------
-- Table structure for kegiatan
-- ----------------------------
DROP TABLE IF EXISTS `kegiatan`;
CREATE TABLE `kegiatan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jenisKegiatan` int(11) NOT NULL,
  `sekolahId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sekolahId`(`sekolahId`) USING BTREE,
  INDEX `jenisKegiatan`(`jenisKegiatan`) USING BTREE,
  CONSTRAINT `kegiatan_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kegiatan_ibfk_2` FOREIGN KEY (`jenisKegiatan`) REFERENCES `kategorikegiatan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kegiatan
-- ----------------------------
INSERT INTO `kegiatan` VALUES (1, 'Pelatihan Guru tentang pembelajaran editing video menggunakan Capcut', '2024-07-29', '<p class=\"ql-align-justify\">Pelatihan guru tentang pembelajaran editing video bertujuan untuk meningkatkan kemampuan guru dalam mengedit video pembelajaran maupun konten di sosial media sekolah tersebut. Workshop ini akan mencakup pengenalan perangkat lunak editing video, teknik dasar pengeditan, dan pembuatan atau pengeditan video.</p>', 2, 1);
INSERT INTO `kegiatan` VALUES (2, 'Pelatihan Guru tentang Canva', '2024-07-29', '<p class=\"ql-align-justify\">Pelatihan guru tentang Canva bertujuan untuk meningkatkan keterampilan desain grafis guru dengan menggunakan aplikasi Canva. Pelatihan ini akan membantu guru dalam membuat materi ajar yang lebih menarik dan interaktif. Workshop intensif ini akan mencakup pengenalan Canva, teknik desain dasar, dan pembuatan berbagai jenis materi ajar. Dengan peningkatan keterampilan desain grafis, guru diharapkan mampu membuat desain yang baik dan menarik untuk materi pembelajaran, poster, dan media visual lainnya, yang akan meningkatkan efektivitas pengajaran</p>', 2, 1);
INSERT INTO `kegiatan` VALUES (3, 'Pembelajaran kepada siswa TK ABA 33 tentang Sains Sederhana', '2024-08-09', '<p class=\"ql-align-justify\">Pembelajaran tentang sains sederhana bertujuan untuk menumbuhkan minat dan pemahaman siswa terhadap konsep-konsep dasar sains melalui eksperimen sederhana. Sesi pembelajaran interaktif ini akan melibatkan eksperimen sains yang mudah dilakukan dan menyenangkan. Dengan pendekatan ini, diharapkan siswa memiliki pemahaman yang lebih baik tentang konsep dasar sains dan menunjukkan minat yang lebih besar dalam pelajaran sains, yang diharapkan dapat meningkatkan prestasi akademik mereka di bidang ini</p>', 1, 3);
INSERT INTO `kegiatan` VALUES (6, 'RAKER TAHUN AJARAN 2024/2025', '2024-07-06', '<p>Merencanakan kegiatan pembelajaran tahun 2024/2025</p>', 2, 3);

-- ----------------------------
-- Table structure for sekolah
-- ----------------------------
DROP TABLE IF EXISTS `sekolah`;
CREATE TABLE `sekolah`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaSekolah` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jamPulang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `jumlahAnak` int(11) NOT NULL,
  `jumlahPengajar` int(11) NOT NULL,
  `jumlahRuangan` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sekolah
-- ----------------------------
INSERT INTO `sekolah` VALUES (1, 'TPA Cita Sakinah', '16:00', 25, 5, 4);
INSERT INTO `sekolah` VALUES (2, 'KB Aisyiyah 24', '10:00', 8, 2, 3);
INSERT INTO `sekolah` VALUES (3, 'TK ABA 33', '11:00', 46, 7, 6);

-- ----------------------------
-- Table structure for struktur
-- ----------------------------
DROP TABLE IF EXISTS `struktur`;
CREATE TABLE `struktur`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usersId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `usersId`(`usersId`) USING BTREE,
  CONSTRAINT `struktur_ibfk_1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of struktur
-- ----------------------------
INSERT INTO `struktur` VALUES (1, 'file-46d4991f627adb375e.png', 1);

-- ----------------------------
-- Table structure for taginformasi
-- ----------------------------
DROP TABLE IF EXISTS `taginformasi`;
CREATE TABLE `taginformasi`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `informasiId` int(11) NOT NULL,
  `sekolahId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `informasiId`(`informasiId`) USING BTREE,
  INDEX `sekolahId`(`sekolahId`) USING BTREE,
  CONSTRAINT `taginformasi_ibfk_1` FOREIGN KEY (`informasiId`) REFERENCES `informasi` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `taginformasi_ibfk_2` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taginformasi
-- ----------------------------
INSERT INTO `taginformasi` VALUES (51, 5, 1);
INSERT INTO `taginformasi` VALUES (52, 1, 1);
INSERT INTO `taginformasi` VALUES (53, 1, 2);
INSERT INTO `taginformasi` VALUES (56, 4, 1);
INSERT INTO `taginformasi` VALUES (57, 4, 2);
INSERT INTO `taginformasi` VALUES (62, 6, 1);
INSERT INTO `taginformasi` VALUES (63, 6, 2);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `noHandphone` bigint(20) NOT NULL DEFAULT 0,
  `sekolahId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sekolahId`(`sekolahId`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'adminTPA', 'd4c6febf2321217ee6fa804b22d1ea91:b5431bf70636011ae2d0b45f', 'admin', 6281236441993, 1);
INSERT INTO `users` VALUES (2, 'adminKB', '5cf8de8b741e15049c78e38507b845f5:b3ff3cfdbf50b92dd49935', 'admin', 628563548749, 2);
INSERT INTO `users` VALUES (3, 'adminTK', 'df37c5e33b83a3b1566dcdd086cafe75:695e9a55130e7bcfc14ade', 'admin', 62895367394609, 3);

SET FOREIGN_KEY_CHECKS = 1;
