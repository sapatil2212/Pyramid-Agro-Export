-- AlterTable
ALTER TABLE `Certification` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `heroButton2Link` VARCHAR(191) NULL,
    ADD COLUMN `heroButton2Text` VARCHAR(191) NULL,
    ADD COLUMN `heroButtonLink` VARCHAR(191) NULL,
    ADD COLUMN `heroButtonText` VARCHAR(191) NULL,
    ADD COLUMN `heroDescription` TEXT NULL,
    ADD COLUMN `heroImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `heroSubtitle` TEXT NULL,
    ADD COLUMN `heroTitle` TEXT NULL;
