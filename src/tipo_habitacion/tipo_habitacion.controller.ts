import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TipoHabitacionService } from './tipo_habitacion.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo_habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo_habitacion.dto';
import { Public } from 'src/config/decorators/public.decorator';
import { AuthGuard } from 'src/lib/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tipo-habitacion')
export class TipoHabitacionController {
  constructor(private readonly tipoHabitacionService: TipoHabitacionService) {}

  @Post()
  create(@Body() createTipoHabitacionDto: CreateTipoHabitacionDto) {
    return this.tipoHabitacionService.create(createTipoHabitacionDto);
  }

  @Get()
  findAll() {
    return this.tipoHabitacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoHabitacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoHabitacionDto: UpdateTipoHabitacionDto,
  ) {
    return this.tipoHabitacionService.update(+id, updateTipoHabitacionDto);
  }

  @Patch('status/:id')
  remove(@Param('id') id: string) {
    return this.tipoHabitacionService.updateStatus(+id);
  }
}
