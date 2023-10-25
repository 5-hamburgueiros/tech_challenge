import { ClienteEntity } from '../../entities';

export interface ICreateCliente {
  execute(params: ICreateCliente.Params): Promise<ClienteEntity>;
}

export const ICreateCliente = Symbol('ICreateCliente');

export namespace ICreateCliente {
  export type Params = {
    nome: string;
    email: string;
    documento: string;
  };
}
