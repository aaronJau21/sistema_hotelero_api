import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { Request } from 'express';
import { PaginationDto } from './dto/Pagination.dto';

@UseGuards(AuthGuard)
@Controller('sucursales')
export class SucursalesController {
  private readonly logger = new Logger(SucursalesController.name);
  constructor(private readonly sucursalesService: SucursalesService) {}

  @Post()
  create(@Body() createSucursaleDto: CreateSucursaleDto, @Req() req: Request) {
    if (!req['user']) {
      this.logger.error('No se encontro el id del usuario');
      throw new NotFoundException('No se encontro el id del usuario');
    }
    const userId = req['user'].id;
    return this.sucursalesService.create(createSucursaleDto, userId);
  }

  @Get('select')
  findSelect() {
    return this.sucursalesService.findSelect();
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.sucursalesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSucursaleDto: UpdateSucursaleDto,
  ) {
    return this.sucursalesService.update(+id, updateSucursaleDto);
  }

  @Patch('status/:id')
  update_status(@Param('id') id: string) {
    return this.sucursalesService.update_status(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalesService.remove(+id);
  }
}
