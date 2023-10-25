import { ICreateCliente } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClienteDto } from '../dtos';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(ICreateCliente)
    private readonly createCliente: ICreateCliente,
  ) {}

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    return this.createCliente.execute(dto);
  }
}
