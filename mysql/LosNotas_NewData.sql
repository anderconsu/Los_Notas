INSERT INTO `dbLosNotas`.`category` (`id`, `name`) VALUES
(1, 'Sports'),
(2, 'Technology'),
(3, 'Fashion'),
(4, 'Food'),
(5, 'Travel'),
(6, 'Music'),
(7, 'Movies'),
(8, 'Health'),
(9, 'Books'),
(10, 'Art');

INSERT INTO `dbLosNotas`.`client` (`id`, `username`, `name`, `lastname`, `password`, `rol`) VALUES
(1, 'user1', 'John', 'Doe', 'password1', 'user'),
(2, 'user2', 'Jane', 'Smith', 'password2', 'user'),
(3, 'user3', 'Michael', 'Johnson', 'password3', 'user'),
(4, 'user4', 'Emily', 'Brown', 'password4', 'user'),
(5, 'user5', 'David', 'Wilson', 'password5', 'user');

-- User 1 notes
INSERT INTO `dbLosNotas`.`note` (`id`, `title`, `content`, `flag`, `client_id`, `category_id`) VALUES
(1, 'Note 1', 'This is the content of note 1 for user 1.', NULL, 1, 1),
(2, 'Note 2', 'This is the content of note 2 for user 1.', NULL, 1, 2);

-- User 2 notes
INSERT INTO `dbLosNotas`.`note` (`id`, `title`, `content`, `flag`, `client_id`, `category_id`) VALUES
(3, 'Note 1', 'This is the content of note 1 for user 2.', NULL, 2, 3),
(4, 'Note 2', 'This is the content of note 2 for user 2.', NULL, 2, 4);

-- User 3 notes
INSERT INTO `dbLosNotas`.`note` (`id`, `title`, `content`, `flag`, `client_id`, `category_id`) VALUES
(5, 'Note 1', 'This is the content of note 1 for user 3.', NULL, 3, 5),
(6, 'Note 2', 'This is the content of note 2 for user 3.', NULL, 3, 6);

-- User 4 notes
INSERT INTO `dbLosNotas`.`note` (`id`, `title`, `content`, `flag`, `client_id`, `category_id`) VALUES
(7, 'Note 1', 'This is the content of note 1 for user 4.', NULL, 4, 7),
(8, 'Note 2', 'This is the content of note 2 for user 4.', NULL, 4, 8);

-- User 5 notes
INSERT INTO `dbLosNotas`.`note` (`id`, `title`, `content`, `flag`, `client_id`, `category_id`) VALUES
(9, 'Note 1', 'This is the content of note 1 for user 5.', NULL, 5, 9),
(10, 'Note 2', 'This is the content of note 2 for user 5.', NULL, 5, 10);