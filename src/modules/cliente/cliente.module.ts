import { ClienteController } from '@/api/controllers/cliente.controller';
import { CreateClienteUseCase } from '@/application/use-cases/cliente/create-cliente.use-case';
import { IClienteRepository } from '@/domain/repository';
import { ICreateCliente } from '@/domain/use-cases';
import { ClienteModelTypeOrm } from '@/infra/database/typerom/model';
import { ClienteRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteModelTypeOrm])],
  controllers: [ClienteController],
  providers: [
    {
      provide: ICreateCliente,
      useClass: CreateClienteUseCase,
    },
    {
      provide: IClienteRepository,
      useClass: ClienteRepositoryTypeOrm,
    },
  ],
})
export class ClienteModule {}
