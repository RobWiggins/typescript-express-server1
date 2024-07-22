-- RedefineIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
DROP INDEX `User.email_unique` ON `User`;
