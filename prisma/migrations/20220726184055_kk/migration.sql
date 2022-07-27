/*
  Warnings:

  - The primary key for the `_sec_rol_permisos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permiso_id` on the `_sec_rol_permisos` table. All the data in the column will be lost.
  - You are about to drop the column `rol_id` on the `_sec_rol_permisos` table. All the data in the column will be lost.
  - The primary key for the `_sec_usuario_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rol_id` on the `_sec_usuario_roles` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `_sec_usuario_roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[A,B]` on the table `_sec_rol_permisos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_sec_usuario_roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `A` to the `_sec_rol_permisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `B` to the `_sec_rol_permisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `A` to the `_sec_usuario_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `B` to the `_sec_usuario_roles` table without a default value. This is not possible if the table is not empty.
  - Made the column `pass` on table `sec_usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_sec_rol_permisos` DROP FOREIGN KEY `_sec_rol_permisos_permiso_id_fkey`;

-- DropForeignKey
ALTER TABLE `_sec_rol_permisos` DROP FOREIGN KEY `_sec_rol_permisos_rol_id_fkey`;

-- DropForeignKey
ALTER TABLE `_sec_usuario_roles` DROP FOREIGN KEY `_sec_usuario_roles_rol_id_fkey`;

-- DropForeignKey
ALTER TABLE `_sec_usuario_roles` DROP FOREIGN KEY `_sec_usuario_roles_usuario_id_fkey`;

-- DropIndex
DROP INDEX `_sec_rol_permisos_rol_id_permiso_id_unique` ON `_sec_rol_permisos`;

-- DropIndex
DROP INDEX `_sec_usuario_roles_usuario_id_rol_id_unique` ON `_sec_usuario_roles`;

-- AlterTable
ALTER TABLE `_sec_rol_permisos` DROP PRIMARY KEY,
    DROP COLUMN `permiso_id`,
    DROP COLUMN `rol_id`,
    ADD COLUMN `A` INTEGER NOT NULL,
    ADD COLUMN `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_sec_usuario_roles` DROP PRIMARY KEY,
    DROP COLUMN `rol_id`,
    DROP COLUMN `usuario_id`,
    ADD COLUMN `A` INTEGER NOT NULL,
    ADD COLUMN `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sec_usuario` MODIFY `pass` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `_sec_rol_permisos_AB_unique` ON `_sec_rol_permisos`(`A`, `B`);

-- CreateIndex
CREATE INDEX `_sec_rol_permisos_B_index` ON `_sec_rol_permisos`(`B`);

-- CreateIndex
CREATE UNIQUE INDEX `_sec_usuario_roles_AB_unique` ON `_sec_usuario_roles`(`A`, `B`);

-- CreateIndex
CREATE INDEX `_sec_usuario_roles_B_index` ON `_sec_usuario_roles`(`B`);

-- AddForeignKey
ALTER TABLE `_sec_usuario_roles` ADD CONSTRAINT `_sec_usuario_roles_A_fkey` FOREIGN KEY (`A`) REFERENCES `sec_rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_usuario_roles` ADD CONSTRAINT `_sec_usuario_roles_B_fkey` FOREIGN KEY (`B`) REFERENCES `sec_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_rol_permisos` ADD CONSTRAINT `_sec_rol_permisos_A_fkey` FOREIGN KEY (`A`) REFERENCES `sec_permiso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_rol_permisos` ADD CONSTRAINT `_sec_rol_permisos_B_fkey` FOREIGN KEY (`B`) REFERENCES `sec_rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
