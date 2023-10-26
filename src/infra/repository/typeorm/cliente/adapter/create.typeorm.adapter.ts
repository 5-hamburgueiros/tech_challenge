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
    typeOrmEntity.criadoEm = params.cliente.criadoEm;
    typeOrmEntity.atualizadoEm = params.cliente.atualizadoEm;
    return typeOrmEntity;
  }

  public result(params: ClienteModelTypeOrm): ClienteEntity {
    return new ClienteEntity({
      id: params.id,
      nome: params.nome,
      email: params.email,
      documento: params.documento,
      criadoEm: params.criadoEm,
      atualizadoEm: params.atualizadoEm,
    });
  }
}
