import { ClienteController } from '@/api/controllers/cliente.controller';
import { FindByDocumentUseCase } from '@/application/use-cases';
import { SignUpUseCase } from '@/application/use-cases/autenticacao/sign-up.use-case';
import { CreateClienteUseCase } from '@/application/use-cases/cliente/create-cliente.use-case';
import { IClienteRepository } from '@/domain/repository';
import { ICreateCliente, IFindByDocumento } from '@/domain/use-cases';
import { ClienteModelTypeOrm } from '@/infra/database/typerom/model';
import { ClienteRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteModelTypeOrm]), HttpModule],
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
    SignUpUseCase,
  ],
})
export class ClienteModule {}
