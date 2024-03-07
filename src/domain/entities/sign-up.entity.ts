import { Entity } from 'typeorm';

@Entity()
export class SignUpEntity {
  public readonly message: string;

  constructor(params: SignUpModel.Params) {
    this.message = params.message;
  }
}

export namespace SignUpModel {
  export type Params = {
    message: string;
  };
}
