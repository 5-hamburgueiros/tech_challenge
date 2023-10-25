import { ClienteEntity } from '@/domain/entities';
import { ClienteModelTypeOrm } from '@/infra/database/typerom/model';

export class FindByDocumentTypeOrmAdapter {
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
