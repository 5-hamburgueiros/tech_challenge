import { ExampleEntity } from '../entities';

export interface ICreateExample {
  execute(params: ICreateExample.Params): Promise<ExampleEntity>;
}

export const ICreateExample = Symbol('ICreateExample');

export namespace ICreateExample {
  export type Params = {
    name: string;
    email: string;
  };
}
