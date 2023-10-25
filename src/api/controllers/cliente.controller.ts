import { ICreateCliente, IFindByDocumento } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateClienteDto } from '../dtos';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(ICreateCliente)
    private readonly createCliente: ICreateCliente,
    @Inject(IFindByDocumento)
    private readonly findByDocumento: IFindByDocumento,
  ) {}

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    return this.createCliente.execute(dto);
  }

  @ApiParam({ name: 'documento' })
  @Get(':documento')
  async findByDocument(@Param('documento') documento: string) {
    return this.findByDocumento.execute({
      documento,
    });
  }
}
