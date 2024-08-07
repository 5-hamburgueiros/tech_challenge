import { ClienteController } from '@/api/controllers/cliente.controller';
import {
  DeleteClienteUseCase,
  FindByDocumentUseCase,
} from '@/application/use-cases';
import { SignUpUseCase } from '@/application/use-cases/autenticacao/sign-up.use-case';
import { CreateClienteUseCase } from '@/application/use-cases/cliente/create-cliente.use-case';
import { IClienteRepository } from '@/domain/repository';
import { AwsCognitoService } from '@/domain/service';
import {
  ICreateCliente,
  IDeleteCliente,
  IFindByDocumento,
} from '@/domain/use-cases';
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
      provide: IDeleteCliente,
      useClass: DeleteClienteUseCase,
    },
    {
      provide: IClienteRepository,
      useClass: ClienteRepositoryTypeOrm,
    },
    SignUpUseCase,
    AwsCognitoService,
  ],
})
export class ClienteModule {}
