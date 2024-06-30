export interface IDeleteCliente {
  execute(params: IDeleteCliente.Params): Promise<void>;
}

export const IDeleteCliente = Symbol('IDeleteCliente');

export namespace IDeleteCliente {
  export type Params = {
    documento: string;
  };
}
