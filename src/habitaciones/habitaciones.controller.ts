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
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { Request } from 'express';
import { Public } from 'src/config/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller('habitaciones')
export class HabitacionesController {
  private readonly logger = new Logger(HabitacionesController.name);
  constructor(private readonly habitacionesService: HabitacionesService) {}

  // @Public()
  @Post()
  create(
    @Body() createHabitacioneDto: CreateHabitacioneDto,
    @Req() req: Request,
  ) {
    if (!req['user']) {
      this.logger.error('No se encontro el id del usuario');
      throw new NotFoundException('No se encontro el id del usuario');
    }
    const userId = req['user'].id;
    return this.habitacionesService.create(createHabitacioneDto, userId);
  }

  @Get()
  findAll() {
    return this.habitacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitacioneDto: UpdateHabitacioneDto,
  ) {
    return this.habitacionesService.update(+id, updateHabitacioneDto);
  }

  @Patch('status/:id')
  update_estatus(@Param('id') id: string) {
    return this.habitacionesService.update_estatus(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitacionesService.remove(+id);
  }
}
