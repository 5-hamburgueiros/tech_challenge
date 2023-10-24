import { ExampleEntity } from '../entities';

export interface IExampleRepository {
  create(
    params: IExampleRepository.Create.Params,
  ): Promise<IExampleRepository.Create.Result>;
  findById(
    params: IExampleRepository.FindById.Params,
  ): Promise<IExampleRepository.FindById.Result>;
  fetchAllByActiveStatus(
    params: IExampleRepository.FetchAllByActiveStatus.Params,
  ): Promise<IExampleRepository.FetchAllByActiveStatus.Result>;
}

export const IExampleRepository = Symbol('IExampleRepository');

export namespace IExampleRepository {
  export namespace Create {
    export type Params = {
      example: ExampleEntity;
    };
    export type Result = ExampleEntity;
  }

  export namespace FindById {
    export type Params = {
      id: string;
    };
    export type Result = ExampleEntity;
  }

  export namespace FetchAllByActiveStatus {
    export type Params = {
      isActive: boolean;
    };
    export type Result = ExampleEntity[];
  }
}
