import { ClienteEntity } from '../entities';

export interface IClienteRepository {
  create(
    params: IClienteRepository.Create.Params,
  ): Promise<IClienteRepository.Create.Result>;
  findByDocumento(
    params: IClienteRepository.FindByDocumento.Params,
  ): Promise<IClienteRepository.FindByDocumento.Result>;
  delete(params: IClienteRepository.DeleteCliente.Params): Promise<void>;
}

export const IClienteRepository = Symbol('IClienteRepository');

export namespace IClienteRepository {
  export namespace Create {
    export type Params = {
      cliente: ClienteEntity;
    };
    export type Result = ClienteEntity;
  }

  export namespace FindByDocumento {
    export type Params = {
      documento: string;
    };
    export type Result = ClienteEntity;
  }
  export namespace DeleteCliente {
    export type Params = {
      documento: string;
    };
  }
}
