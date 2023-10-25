import { ClienteEntity } from '@/domain/entities';
import { IClienteRepository } from '@/domain/repository';
import { ClienteModelTypeOrm } from '@/infra/database/typerom/model';

export class CreateTypeOrmAdapter {
  public command(
    params: IClienteRepository.Create.Params,
  ): ClienteModelTypeOrm {
    const typeOrmEntity = new ClienteModelTypeOrm();
    typeOrmEntity.id = params.cliente.id;
    typeOrmEntity.nome = params.cliente.nome;
    typeOrmEntity.email = params.cliente.email;
    typeOrmEntity.documento = params.cliente.documento;
    typeOrmEntity.createdAt = params.cliente.createdAt;
    typeOrmEntity.updatedAt = params.cliente.updatedAt;
    return typeOrmEntity;
  }

  public result(params: ClienteModelTypeOrm): ClienteEntity {
    return new ClienteEntity({
      id: params.id,
      nome: params.nome,
      email: params.email,
      documento: params.documento,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }
}
