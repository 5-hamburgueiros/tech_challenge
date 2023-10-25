import { ClienteController } from '@/api/controllers/cliente.controller';
import { FindByDocumentUseCase } from '@/application/use-cases';
import { CreateClienteUseCase } from '@/application/use-cases/cliente/create-cliente.use-case';
import { IClienteRepository } from '@/domain/repository';
import { ICreateCliente, IFindByDocumento } from '@/domain/use-cases';
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
      provide: IFindByDocumento,
      useClass: FindByDocumentUseCase,
    },
    {
      provide: IClienteRepository,
      useClass: ClienteRepositoryTypeOrm,
    },
  ],
})
export class ClienteModule {}
