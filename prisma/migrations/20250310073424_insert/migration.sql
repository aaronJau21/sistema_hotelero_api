/*
  Warnings:

  - Added the required column `id_type_reserva` to the `Reservas` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Reservas] ADD [id_type_reserva] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Departamentos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(50) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Departamentos_status_df] DEFAULT 1,
    CONSTRAINT [Departamentos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Departamentos_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[Restaurantes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(50) NOT NULL,
    [direccion] NVARCHAR(1000) NOT NULL,
    [imagen] TEXT NOT NULL,
    [descripcion] TEXT NOT NULL,
    [id_departamentos] INT NOT NULL,
    CONSTRAINT [Restaurantes_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Restaurantes_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[TypeReserva] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(20) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [TypeReserva_status_df] DEFAULT 1,
    CONSTRAINT [TypeReserva_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [TypeReserva_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- AddForeignKey
ALTER TABLE [dbo].[Restaurantes] ADD CONSTRAINT [Restaurantes_id_departamentos_fkey] FOREIGN KEY ([id_departamentos]) REFERENCES [dbo].[Departamentos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reservas] ADD CONSTRAINT [Reservas_id_type_reserva_fkey] FOREIGN KEY ([id_type_reserva]) REFERENCES [dbo].[TypeReserva]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
