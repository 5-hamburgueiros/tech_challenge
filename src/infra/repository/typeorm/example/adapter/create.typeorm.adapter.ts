import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';

export class CreateTypeOrmAdapter {
  public command(
    params: IExampleRepository.Create.Params,
  ): ExampleModelTypeOrm {
    const typeOrmEntity = new ExampleModelTypeOrm();
    typeOrmEntity.id = params.example.id;
    typeOrmEntity.name = params.example.name;
    typeOrmEntity.email = params.example.email;
    typeOrmEntity.isActive = params.example.active;
    typeOrmEntity.createdAt = params.example.createdAt;
    typeOrmEntity.updatedAt = params.example.updatedAt;
    return typeOrmEntity;
  }

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
