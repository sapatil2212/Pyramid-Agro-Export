-- AlterTable
ALTER TABLE `Product` ADD COLUMN `ctaButtonLink` VARCHAR(191) NULL,
    ADD COLUMN `ctaButtonText` VARCHAR(191) NULL,
    ADD COLUMN `ctaDescription` TEXT NULL,
    ADD COLUMN `ctaTitle` TEXT NULL,
    ADD COLUMN `featuresSubtitle` TEXT NULL,
    ADD COLUMN `featuresTitle` TEXT NULL;
