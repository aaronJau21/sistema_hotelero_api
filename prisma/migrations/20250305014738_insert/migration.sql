BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(50) NOT NULL,
    [apellido_paterno] VARCHAR(50) NOT NULL,
    [apellido_materno] VARCHAR(50) NOT NULL,
    [user_name] VARCHAR(20) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Users_status_df] DEFAULT 1,
    [role_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Users_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_nombre_key] UNIQUE NONCLUSTERED ([nombre]),
    CONSTRAINT [Users_user_name_key] UNIQUE NONCLUSTERED ([user_name])
);

-- CreateTable
CREATE TABLE [dbo].[Categoria_habitaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(50) NOT NULL,
    [descripcion] TEXT,
    [capacidad] INT NOT NULL,
    [precioBase] DECIMAL(32,16) NOT NULL CONSTRAINT [Categoria_habitaciones_precioBase_df] DEFAULT 0.00,
    [status] BIT NOT NULL CONSTRAINT [Categoria_habitaciones_status_df] DEFAULT 1,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Categoria_habitaciones_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Categoria_habitaciones_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Categoria_habitaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Estado_habitacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(15) NOT NULL,
    CONSTRAINT [Estado_habitacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Sucursales_hoteles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [direccion] NVARCHAR(1000) NOT NULL,
    [id_user] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Sucursales_hoteles_status_df] DEFAULT 1,
    CONSTRAINT [Sucursales_hoteles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Habitaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [numero_habitacion] VARCHAR(10) NOT NULL,
    [id_categoria] INT NOT NULL,
    [id_sucursal] INT NOT NULL,
    [id_estado_habitacion] INT NOT NULL CONSTRAINT [Habitaciones_id_estado_habitacion_df] DEFAULT 1,
    [status] BIT NOT NULL CONSTRAINT [Habitaciones_status_df] DEFAULT 1,
    [id_user] INT NOT NULL,
    [descripcion] TEXT,
    [servicios_incluidos] TEXT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Habitaciones_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Habitaciones_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Habitaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Habitaciones_fotos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [foto] TEXT NOT NULL,
    [id_user] INT NOT NULL,
    [id_habitacion] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Habitaciones_fotos_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Habitaciones_fotos_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Habitaciones_fotos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Clientes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(20) NOT NULL,
    [apellido_paterno] VARCHAR(20) NOT NULL,
    [apellido_materno] VARCHAR(20) NOT NULL,
    [email] VARCHAR(50) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [edad] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Clientes_status_df] DEFAULT 1,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Clientes_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Clientes_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Clientes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Estado_reservas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(15) NOT NULL,
    CONSTRAINT [Estado_reservas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reservas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [id_user] INT NOT NULL,
    [id_habitacion] INT NOT NULL,
    [fecha_inicio] DATETIME2 NOT NULL,
    [fecha_fin] DATETIME2 NOT NULL,
    [costo_total] DECIMAL(32,16) NOT NULL,
    [id_estado_reservas] INT NOT NULL CONSTRAINT [Reservas_id_estado_reservas_df] DEFAULT 1,
    [fecha_reserva] DATETIME2 NOT NULL CONSTRAINT [Reservas_fecha_reserva_df] DEFAULT CURRENT_TIMESTAMP,
    [numero_personas] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Reservas_status_df] DEFAULT 1,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Reservas_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [Reservas_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Reservas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[Roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Sucursales_hoteles] ADD CONSTRAINT [Sucursales_hoteles_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones] ADD CONSTRAINT [Habitaciones_id_categoria_fkey] FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[Categoria_habitaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones] ADD CONSTRAINT [Habitaciones_id_sucursal_fkey] FOREIGN KEY ([id_sucursal]) REFERENCES [dbo].[Sucursales_hoteles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones] ADD CONSTRAINT [Habitaciones_id_estado_habitacion_fkey] FOREIGN KEY ([id_estado_habitacion]) REFERENCES [dbo].[Estado_habitacion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones] ADD CONSTRAINT [Habitaciones_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones_fotos] ADD CONSTRAINT [Habitaciones_fotos_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Habitaciones_fotos] ADD CONSTRAINT [Habitaciones_fotos_id_habitacion_fkey] FOREIGN KEY ([id_habitacion]) REFERENCES [dbo].[Habitaciones]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reservas] ADD CONSTRAINT [Reservas_id_client_fkey] FOREIGN KEY ([id_client]) REFERENCES [dbo].[Clientes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reservas] ADD CONSTRAINT [Reservas_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reservas] ADD CONSTRAINT [Reservas_id_habitacion_fkey] FOREIGN KEY ([id_habitacion]) REFERENCES [dbo].[Habitaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reservas] ADD CONSTRAINT [Reservas_id_estado_reservas_fkey] FOREIGN KEY ([id_estado_reservas]) REFERENCES [dbo].[Estado_reservas]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
