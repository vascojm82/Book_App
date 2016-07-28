/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`bookId`, `ISBN`, `name`, `details`, `category`, `author`, `publish_date`, `on_hand`, `on_loan`) VALUES
	(41, '1890774758', 'Murach\'s ASP.NET 4.5 Web Programming with C# 2012', 'Learn ASP.NET 4.5', 'IT', 'Mary Delamater', '2013-08-07', 6, 0),
	(42, '1890774944', 'Murach\'s C# 2015', 'Lean C# 2015', 'IT', 'Joel Murach', '2016-02-05', 5, 0),
	(8, '1783553812', 'AngularJS by Example', 'Learn AngularJS by example', 'IT', 'Chandermani', '2015-03-10', 5, 0),
	(38, '1617292036', 'Getting MEAN with Mongo, Express, Angular, and Node 1st Edition', 'Learn the MEAN stack', 'IT', 'Simon Holmes', '2015-11-26', 4, 0),
	(39, '0321833872', 'MySQL Developer\'s Library 5th Edition', 'Learn MySQL', 'IT', 'Paul DuBois ', '2013-04-12', 4, 0),
	(40, '1890774693', 'Murach\'s SQL Server 2012 for Developers', 'Learn SQL Server 2012', 'IT', 'Joel Murach', '2012-08-20', 5, 0),
	(30, '0321616951', 'Designing with web standards', 'Learn modern wed design standards', 'IT', 'Jeffrey Zeldman', '2009-10-25', 6, 0),
	(31, '1491936088', 'Laravel: Up and Running: A Framework for Building Modern PHP Apps', 'Learn Laravel the right way', 'IT', 'Matt Stauffer', '2015-09-25', 4, 0),
	(13, '1784391581', 'Learning Laravels Eloquent', 'Good Hands on training for Laravel Eloquent', 'IT', 'Francesco Malatesta', '2015-09-01', 5, 5),
	(43, '1890774960', 'Murach\'s SQL Server 2016 for Developers', 'Learn SQL Server 2016', 'IT', 'Joel Murach', '2016-06-30', 5, 0),
	(44, '1890774790', 'Murach\'s PHP and MySQL, 2nd Edition', 'Learn PHP and MySQL', 'IT', 'Joel Murach', '2014-12-01', 4, 0),
	(15, '0321563840', 'The C++ Programming Language, 4th Edition', 'Training from the creator of C++', 'IT', 'Bjarne Stroustrup', '2013-05-19', 6, 0),
	(36, '178588719X', 'Angular 2 By Example', 'Learn Angular 2 by example', 'IT', 'Chandermani Arora', '2015-09-06', 5, 0),
	(17, '0071808558', 'Java: The Complete Reference, 9th Edition', 'Oracle Java Reference', 'IT', 'Herbert Schildt', '2014-04-01', 5, 0),
	(18, '1785283014', 'Laravel 5 Essentials', 'Learn Laravel 5 Essentials', 'IT', 'Martin Bean', '2015-04-30', 4, 0);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`migration`, `batch`) VALUES
	('2016_07_01_170031_book', 1),
	('2016_07_01_210817_transaction', 2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` (`transactionId`, `bookId`, `transaction_type`, `transaction_date`, `issue_date`, `expected_return_date`, `return_date`) VALUES
	(26, 43, 'return', '2016-07-26', '2016-07-26', '2016-08-13', '2016-08-12'),
	(27, 40, 'return', '2016-07-29', '2016-07-29', '2016-08-12', '2016-08-12'),
	(4, 43, 'return', '2016-07-26', '2016-07-26', '2016-08-09', '2016-08-03'),
	(11, 8, 'return', '2016-07-25', '2016-07-25', '2016-08-09', '2016-08-07'),
	(25, 44, 'return', '2016-07-28', '2016-07-28', '2016-08-11', '2016-08-09'),
	(13, 41, 'return', '2016-07-26', '2016-07-26', '2016-08-10', '2016-08-07'),
	(16, 42, 'return', '2016-07-19', '2016-07-19', '2016-08-10', '2016-08-07'),
	(23, 40, 'return', '2016-07-27', '2016-07-27', '2016-08-11', '2016-08-11'),
	(24, 44, 'return', '2016-07-28', '2016-07-28', '2016-08-11', '2016-08-03'),
	(28, 42, 'return', '2016-07-27', '2016-07-27', '2016-08-22', '2016-08-17'),
	(43, 43, 'return', '2016-07-27', '2016-07-27', '2016-08-11', '2016-08-10'),
	(42, 42, 'return', '2016-07-27', '2016-07-27', '2016-08-25', '2016-08-17'),
	(46, 44, 'return', '2016-07-28', '2016-07-28', '2016-08-12', '2016-08-11'),
	(45, 41, 'return', '2016-07-27', '2016-07-27', '2016-08-26', '2016-07-21'),
	(44, 42, 'return', '2016-07-27', '2016-07-27', '2016-08-13', '2016-08-12');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
