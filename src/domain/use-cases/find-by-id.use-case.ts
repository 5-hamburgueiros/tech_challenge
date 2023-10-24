import { ExampleEntity } from '../entities';

export interface IFindById {
  execute(params: IFindById.Params): Promise<ExampleEntity>;
}

export const IFindById = Symbol('IFindById');

export namespace IFindById {
  export type Params = {
    id: string;
  };
}
