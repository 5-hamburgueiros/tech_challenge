import { Observable } from 'rxjs';
import { SignUpEntity } from '../../entities';

export interface ISignUp {
  execute(params: ISignUp.Params): Promise<Observable<SignUpEntity>>;
}

export const ISignUp = Symbol('ISignUp');

export namespace ISignUp {
  export type Params = {
    cpf: string;
  };
}
