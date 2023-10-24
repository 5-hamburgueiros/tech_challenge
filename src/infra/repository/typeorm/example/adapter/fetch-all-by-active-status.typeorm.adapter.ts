import { ExampleEntity } from '@/domain/entities';
import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';

export class FetchAllByActiveStatusTypeOrmAdapter {
  public result(params: ExampleModelTypeOrm[]): ExampleEntity[] {
    return params.map((param) => {
      return new ExampleEntity({
        id: param.id,
        name: param.name,
        email: param.email,
        active: param.isActive,
        createdAt: param.createdAt,
        updatedAt: param.updatedAt,
      });
    });
  }
}
