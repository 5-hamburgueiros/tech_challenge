import {
  ICreateCliente,
  IDeleteCliente,
  IFindByDocumento,
} from '@/domain/use-cases';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateClienteDto } from '../dtos';
import { AllowAnonymous } from '../middlewares/auth-guard.strategy';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(ICreateCliente)
    private readonly createCliente: ICreateCliente,
    @Inject(IFindByDocumento)
    private readonly findByDocumento: IFindByDocumento,
    @Inject(IDeleteCliente)
    private readonly deleteCliente: IDeleteCliente,
  ) {}

  @UseGuards()
  @AllowAnonymous()
  @Post()
  async create(@Body() dto: CreateClienteDto) {
    return this.createCliente.execute(dto);
  }

  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @ApiParam({ name: 'documento' })
  @Get(':documento')
  async findByDocument(@Param('documento') documento: string) {
    return this.findByDocumento.execute({
      documento,
    });
  }
  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @ApiParam({ name: 'documento' })
  @Delete(':documento')
  async delete(@Param('documento') documento: string) {
    return this.deleteCliente.execute({
      documento,
    });
  }
}
