import { ExampleEntity } from '@/domain/entities';
import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';

export class FindByIdTypeOrmAdapter {
  public result(params: ExampleModelTypeOrm): ExampleEntity {
    return new ExampleEntity({
      id: params.id,
      name: params.name,
      email: params.email,
      active: params.isActive,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }
}
