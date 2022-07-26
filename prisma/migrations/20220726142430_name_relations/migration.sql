-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Palta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `origen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sec_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(100) NULL,
    `lastName` VARCHAR(100) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `dni` INTEGER NULL,
    `adress` VARCHAR(255) NULL,
    `userName` VARCHAR(100) NULL,
    `telefono` VARCHAR(191) NULL,
    `pass` VARCHAR(100) NULL,

    UNIQUE INDEX `sec_usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sec_rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `nombre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sec_permiso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdate` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` INTEGER NOT NULL DEFAULT 1,
    `nombre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sec_usuario_roles` (
    `rol_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    UNIQUE INDEX `_sec_usuario_roles_AB_unique`(`rol_id`, `usuario_id`),
    INDEX `_sec_usuario_roles_B_index`(`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sec_rol_permisos` (
    `permiso_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,

    UNIQUE INDEX `_sec_rol_permisos_AB_unique`(`permiso_id`, `rol_id`),
    INDEX `_sec_rol_permisos_B_index`(`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_sec_usuario_roles` ADD CONSTRAINT `_sec_usuario_roles_A_fkey` FOREIGN KEY (`rol_id`) REFERENCES `sec_rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_usuario_roles` ADD CONSTRAINT `_sec_usuario_roles_B_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `sec_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_rol_permisos` ADD CONSTRAINT `_sec_rol_permisos_A_fkey` FOREIGN KEY (`permiso_id`) REFERENCES `sec_permiso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sec_rol_permisos` ADD CONSTRAINT `_sec_rol_permisos_B_fkey` FOREIGN KEY (`rol_id`) REFERENCES `sec_rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
