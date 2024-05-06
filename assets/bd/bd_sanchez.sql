-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2024 a las 13:39:20
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_sanchez`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Borrar_Anuncios` (IN `_id` INT)   delete from anuncios  where anun_id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Borrar_Deportes` (IN `_id` INT)   delete from deportes where dte_id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Borrar_Deportistas` (IN `_id` INT)   delete from deportistas where dta_id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertar_Anuncios` (IN `_texto` TEXT, IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
insert into anuncios values (null, _texto, now(), null);
else
insert into anuncios values (null, _texto, now(), _fechaB);
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertar_Deportes` (IN `_nombre` VARCHAR(50), IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
insert into deportes values (null, _nombre, now(), null);
else
insert into deportes values (null, _nombre, now(), _fechaB);
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertar_Deportistas` (IN `_nombre` VARCHAR(50), IN `_password` VARCHAR(50), IN `_telef` VARCHAR(20), IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
insert into deportistas values (null, _nombre, md5(_password), _telef, now(), null, 0);
else
insert into deportistas values (null, _nombre, md5(_password), _telef, now(), _fechaB, 0);
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Modificar_Anuncios` (IN `_id` INT, IN `_texto` TEXT, IN `_fechaA` DATE, IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
update anuncios set anun_texto = _texto, anun_fecha_alta = _fechaA, anun_fecha_baja = null where anun_id = _id;
else
update anuncios set anun_texto = _texto, anun_fecha_alta = _fechaA, anun_fecha_baja = _fechaB where anun_id = _id;
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Modificar_Deportes` (IN `_id` INT, IN `_nombre` VARCHAR(50), IN `_fechaA` DATE, IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
update deportes set dte_nombre = _nombre, dte_fecha_alta = _fechaA, dte_fecha_baja = null where dte_id = _id;
else
update deportes set dte_nombre = _nombre, dte_fecha_alta = _fechaA, dte_fecha_baja = _fechaB where dte_id = _id;
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Modificar_Deportistas` (IN `_id` INT, IN `_nombre` VARCHAR(50), IN `_password` VARCHAR(50), IN `_telef` VARCHAR(20), IN `_fechaA` DATE, IN `_fechaB` DATE)   if _fechaB = "0000-00-00" then
update deportistas set dta_nombre = _nombre, dta_password = md5(_password), dta_telefono = _telef, dta_fecha_alta = _fechaA, dta_fecha_baja = null where dta_id = _id;
else
update deportistas set dta_nombre = _nombre, dta_password = md5(_password), dta_telefono = _telef, dta_fecha_alta = _fechaA, dta_fecha_baja = _fechaB where dta_id = _id;
end if$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectDeportes` ()   SELECT * FROM deportes$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectDeportes_ID` (IN `_id` INT)   SELECT * FROM deportes where dte_id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectDeportistas` ()   SELECT * FROM deportistas$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectDeportistas_Filtro` (IN `_filtro` VARCHAR(50))   SELECT * FROM deportistas as d WHERE 
d.dta_nombre LIKE concat("%",_filtro,"%") OR
d.dta_telefono LIKE concat("%",_filtro,"%") OR
d.dta_fecha_alta LIKE concat("%",_filtro,"%") OR
d.dta_fecha_baja LIKE concat("%",_filtro,"%")$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Ver_Anuncios` ()   SELECT * FROM anuncios$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Ver_Anuncios_ID` (IN `_id` INT)   SELECT * FROM anuncios where anun_id = _id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `anun_id` int(11) NOT NULL,
  `anun_texto` text NOT NULL,
  `anun_fecha_alta` date DEFAULT NULL,
  `anun_fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anuncios`
--

INSERT INTO `anuncios` (`anun_id`, `anun_texto`, `anun_fecha_alta`, `anun_fecha_baja`) VALUES
(1, 'El próximo día <b>2024-05-02</b> comenzará un curso de <b>xxxxxxxxxxx</b>.<br>Apúntate!!!', '2024-05-01', '2024-05-31'),
(2, 'Compre Cocacola<BR>o<BR>FantaO<br>o<BR>Schweppes', '2024-04-30', '2024-04-01'),
(3, 'Visite nuestro bar', '2024-10-24', '2024-05-02'),
(4, 'El próximo día <b>2024-05-02</b> comenzará un curso de <b>bbbbbbbbbbbbb</b>.<br>Apúntate!!!', '2024-05-02', '2024-06-19'),
(8, 'El próximo día <b>2024-05-02</b> comenzará un curso de <b>sdfsdsdf</b>', '2024-05-02', '0000-00-00'),
(9, 'El próximo día <b>2024-05-02</b> comenzará un curso de <b>sgsgg</b> y finalizará el día <b>2024-10-01</b>', '2024-05-02', '2024-10-01'),
(14, 'NUEVO DEPORTE DISPONIBLE: BALONMANODESDE EL 2024-05-06 HASTA 2024-06-06', '2024-05-06', '2024-06-06'),
(15, 'NUEVO DEPORTE DISPONIBLE: PESCA DESDE EL 2024-05-06 HASTA 2024-06-06', '2024-05-06', '2024-06-06'),
(16, 'NUEVO DEPORTE DISPONIBLE: PEPE', '2024-05-06', NULL),
(17, 'NUEVO DEPORTE DISPONIBLE: A', '2024-05-06', NULL),
(18, 'NUEVO DEPORTE DISPONIBLE: ALA DESDE EL 2024-05-16 HASTA 2024-05-09', '2024-05-06', '2024-05-09'),
(19, 'NUEVO DEPORTE DISPONIBLE: POL', '2024-05-06', NULL),
(20, 'patatas fritas gratisssss', '2024-05-06', '2024-06-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportes`
--

CREATE TABLE `deportes` (
  `dte_id` int(11) NOT NULL,
  `dte_nombre` varchar(50) NOT NULL,
  `dte_fecha_alta` date DEFAULT NULL,
  `dte_fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deportes`
--

INSERT INTO `deportes` (`dte_id`, `dte_nombre`, `dte_fecha_alta`, `dte_fecha_baja`) VALUES
(1, 'Fútbol', '2024-05-02', NULL),
(2, 'Golf', '2024-05-02', NULL),
(3, 'Baloncesto', '2024-05-02', NULL),
(4, 'Pádel', '2024-05-02', NULL),
(5, 'Bádminton', '2024-05-02', NULL),
(6, 'Judo', '2024-05-02', NULL),
(7, 'Tenis', '2024-05-02', NULL),
(15, 'r', '2024-05-02', NULL),
(17, 'perico', '2024-05-02', NULL),
(18, 'ajedrez', '2022-05-06', NULL),
(19, 'xxxxxx', '2026-05-06', '2024-06-06'),
(20, 'sdfsdsdf', '2024-05-02', '2050-12-31'),
(21, 'sgsgg', '2024-05-02', '2024-10-01'),
(22, 'Hípica', NULL, NULL),
(23, 'Hípica', NULL, NULL),
(24, 'hockey', '2024-05-02', NULL),
(25, 'pingpong', '2024-05-02', '2024-05-23'),
(26, 'Motos', '2024-05-03', NULL),
(34, 'Balonmano', '2024-05-06', '2024-06-06'),
(35, 'pesca', '2024-05-06', '2024-06-06'),
(41, 'a', '2024-05-09', NULL),
(42, 'ala', '2024-05-16', '2024-05-09');

--
-- Disparadores `deportes`
--
DELIMITER $$
CREATE TRIGGER `new_deporte` AFTER INSERT ON `deportes` FOR EACH ROW if new.dte_fecha_baja is null then 
		INSERT INTO anuncios VALUES
		(null, CONCAT("NUEVO DEPORTE DISPONIBLE: ", UPPER(new.dte_nombre)), now(), new.dte_fecha_baja);
else
      	INSERT INTO anuncios VALUES
		(null, CONCAT("NUEVO DEPORTE DISPONIBLE: ",UPPER(new.dte_nombre), " DESDE EL ", new.dte_fecha_alta, " HASTA ",new.dte_fecha_baja), now(), new.dte_fecha_baja);
end if
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportes_deportistas`
--

CREATE TABLE `deportes_deportistas` (
  `dte_id` int(11) NOT NULL,
  `dta_id` int(11) NOT NULL,
  `dd_fecha_alta` date NOT NULL DEFAULT current_timestamp(),
  `dd_fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deportes_deportistas`
--

INSERT INTO `deportes_deportistas` (`dte_id`, `dta_id`, `dd_fecha_alta`, `dd_fecha_baja`) VALUES
(1, 2, '2024-05-01', NULL),
(2, 4, '2024-05-01', NULL),
(3, 1, '2024-05-01', NULL),
(4, 3, '2024-05-01', NULL),
(5, 7, '2024-05-01', NULL),
(6, 5, '2024-05-01', NULL),
(7, 7, '2024-05-01', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportistas`
--

CREATE TABLE `deportistas` (
  `dta_id` int(11) NOT NULL,
  `dta_nombre` varchar(50) NOT NULL,
  `dta_password` varchar(50) NOT NULL,
  `dta_telefono` varchar(20) NOT NULL,
  `dta_fecha_alta` date DEFAULT NULL,
  `dta_fecha_baja` date DEFAULT NULL,
  `dta_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deportistas`
--

INSERT INTO `deportistas` (`dta_id`, `dta_nombre`, `dta_password`, `dta_telefono`, `dta_fecha_alta`, `dta_fecha_baja`, `dta_admin`) VALUES
(1, 'admin', '3ba430337eb30f5fd7569451b5dfdf32', '691704600', '2024-05-06', '2026-12-31', 1),
(2, 'admin2', '81dc9bdb52d04dc20036dbd8313ed055', '1234', '2024-05-06', '2024-06-06', 0),
(3, 'Jorge', 'f4a1c8901a3d406f17af67144a3ec71a', '', '2024-05-02', NULL, 0),
(4, 'Loreto', '279583571681a868005a5d7d3af9e0d4', '', '2024-05-02', NULL, 0),
(5, 'Andrea', '28f719c89ef7f33ce2e178490676b5ab', '', '2024-05-02', NULL, 0),
(6, 'Claudia', 'bb07c989b57c25fd7e53395c3e118185', '', '2024-05-02', NULL, 0),
(7, 'Jesus', 'e9829608dd90ff6b8bf7cb50746eae78', '', '2024-05-02', NULL, 0),
(8, 'Sergio', 'dc1d67d1a5e9d52940945516548c8ec3', '', '2024-05-02', NULL, 0),
(13, 'David Pires', '172522ec1028ab781d9dfd17eaca4427', '635974168', '2024-05-06', NULL, 0),
(14, 'a', '81dc9bdb52d04dc20036dbd8313ed055', '124', '2024-05-06', '0000-00-00', 0),
(15, 'pol', 'c20ad4d76fe97759aa27a0c99bff6710', '8888', '2024-05-07', '2024-06-06', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion`
--

CREATE TABLE `facturacion` (
  `fac_fecha` date NOT NULL,
  `fac_dta_id` int(11) NOT NULL,
  `fac_num_deportes` int(11) NOT NULL,
  `fac_importe` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`anun_id`);

--
-- Indices de la tabla `deportes`
--
ALTER TABLE `deportes`
  ADD PRIMARY KEY (`dte_id`);

--
-- Indices de la tabla `deportes_deportistas`
--
ALTER TABLE `deportes_deportistas`
  ADD PRIMARY KEY (`dte_id`,`dta_id`),
  ADD KEY `dta_id` (`dta_id`);

--
-- Indices de la tabla `deportistas`
--
ALTER TABLE `deportistas`
  ADD PRIMARY KEY (`dta_id`);

--
-- Indices de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD UNIQUE KEY `fac_fecha` (`fac_fecha`,`fac_dta_id`),
  ADD KEY `r_fac_dta` (`fac_dta_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `anun_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `deportes`
--
ALTER TABLE `deportes`
  MODIFY `dte_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `deportistas`
--
ALTER TABLE `deportistas`
  MODIFY `dta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `deportes_deportistas`
--
ALTER TABLE `deportes_deportistas`
  ADD CONSTRAINT `deportes_deportistas_ibfk_1` FOREIGN KEY (`dte_id`) REFERENCES `deportes` (`dte_id`),
  ADD CONSTRAINT `deportes_deportistas_ibfk_2` FOREIGN KEY (`dta_id`) REFERENCES `deportistas` (`dta_id`);

--
-- Filtros para la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD CONSTRAINT `r_fac_dta` FOREIGN KEY (`fac_dta_id`) REFERENCES `deportistas` (`dta_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
