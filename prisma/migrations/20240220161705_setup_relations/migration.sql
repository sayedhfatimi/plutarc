-- AddForeignKey
ALTER TABLE `UserAPICredentials` ADD CONSTRAINT `UserAPICredentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
