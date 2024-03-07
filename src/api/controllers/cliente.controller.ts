import { ICreateCliente, IFindByDocumento } from '@/domain/use-cases';
import {
  Body,
  Controller,
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
}
