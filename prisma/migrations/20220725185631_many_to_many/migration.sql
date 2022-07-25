-- DropForeignKey
ALTER TABLE `sec_permisos` DROP FOREIGN KEY `sec_permisos_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `sec_roles` DROP FOREIGN KEY `sec_roles_usuarioId_fkey`;

-- CreateTable
CREATE TABLE `_sec_rolesTosec_usuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sec_rolesTosec_usuario_AB_unique`(`A`, `B`),
    INDEX `_sec_rolesTosec_usuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sec_permisosTosec_roles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sec_permisosTosec_roles_AB_unique`(`A`, `B`),
    INDEX `_sec_permisosTosec_roles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_sec_rolesTosec_usuario` ADD CONSTRAINT `_sec_rolesTosec_usuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `sec_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_rolesTosec_usuario` ADD CONSTRAINT `_sec_rolesTosec_usuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `sec_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_permisosTosec_roles` ADD CONSTRAINT `_sec_permisosTosec_roles_A_fkey` FOREIGN KEY (`A`) REFERENCES `sec_permisos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_permisosTosec_roles` ADD CONSTRAINT `_sec_permisosTosec_roles_B_fkey` FOREIGN KEY (`B`) REFERENCES `sec_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
