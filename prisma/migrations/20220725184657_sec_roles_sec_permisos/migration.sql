-- CreateTable
CREATE TABLE `sec_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `nombre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sec_permisos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `nombre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `rolId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sec_roles` ADD CONSTRAINT `sec_roles_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `sec_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sec_permisos` ADD CONSTRAINT `sec_permisos_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `sec_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
