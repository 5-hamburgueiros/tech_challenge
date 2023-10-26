import { ClienteEntity } from '../entities';

export interface IClienteRepository {
  create(
    params: IClienteRepository.Create.Params,
  ): Promise<IClienteRepository.Create.Result>;
  findByDocument(
    params: IClienteRepository.FindByDocument.Params,
  ): Promise<IClienteRepository.FindByDocument.Result>;
}

export const IClienteRepository = Symbol('IClienteRepository');

export namespace IClienteRepository {
  export namespace Create {
    export type Params = {
      cliente: ClienteEntity;
    };
    export type Result = ClienteEntity;
  }

  export namespace FindByDocument {
    export type Params = {
      document: string;
    };
    export type Result = ClienteEntity;
  }
}
