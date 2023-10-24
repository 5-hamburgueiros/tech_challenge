import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';
import { AbstractEntity } from './abstract.entity';

export class ExampleEntity extends AbstractEntity {
  public name: string;
  public email: string;
  public active: boolean;

  constructor(params: ExampleModel.Params) {
    super(params.id, params.createdAt, params.updatedAt);
    this.name = params.name;
    this.email = params.email;
    this.active = params.active || false;
  }

  static FromTypeOrmModel(param: ExampleModelTypeOrm): ExampleEntity {
    return new ExampleEntity({
      id: param.id,
      name: param.name,
      email: param.email,
      active: param.isActive,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
  }
}

export namespace ExampleModel {
  export type Params = {
    id: string;
    name: string;
    email: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}
