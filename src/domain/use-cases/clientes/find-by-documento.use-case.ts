import { ClienteEntity } from '../../entities';

export interface IFindByDocumento {
  execute(params: IFindByDocumento.Params): Promise<ClienteEntity>;
}

export const IFindByDocumento = Symbol('IFindByDocumento');

export namespace IFindByDocumento {
  export type Params = {
    documento: string;
  };
}
