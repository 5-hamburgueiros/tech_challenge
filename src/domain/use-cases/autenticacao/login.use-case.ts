import { Observable } from 'rxjs';
import { AutenticacaoEntity } from '../../entities';

export interface ILogin {
  execute(params: ILogin.Params): Promise<Observable<AutenticacaoEntity>>;
}

export const ILogin = Symbol('ILogin');

export namespace ILogin {
  export type Params = {
    cpf: string;
  };
}
