import { Entity } from 'typeorm';

@Entity()
export class AutenticacaoEntity {
  public readonly accessToken: string;
  public readonly refreshToken: string;
  public readonly type: string;
  public readonly expiresIn: number;
  public readonly cpf: string;

  constructor(params: AutenticacaoModel.Params) {
    this.cpf = params.cpf;
  }
}

export namespace AutenticacaoModel {
  export type Params = {
    cpf?: string;
    accessToken: string;
    refreshToken: string;
    type: string;
    expiresIn: number;
  };
}
