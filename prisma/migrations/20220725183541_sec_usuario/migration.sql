/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `LastName` VARCHAR(191) NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- CreateTable
CREATE TABLE `sec_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(100) NULL,
    `LastName` VARCHAR(100) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `dni` INTEGER NULL,
    `adress` VARCHAR(255) NULL,
    `userName` VARCHAR(100) NULL,
    `telefono` VARCHAR(191) NULL,

    UNIQUE INDEX `sec_usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
