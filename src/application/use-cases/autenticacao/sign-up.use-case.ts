import { SignUpEntity } from '@/domain/entities';
import { BadRequestException } from '@/domain/exceptions';
import { ISignUp } from '@/domain/use-cases';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class SignUpUseCase implements ISignUp {
  constructor(private readonly httpService: HttpService) {}

  async execute(params: ISignUp.Params): Promise<Observable<SignUpEntity>> {
    return this.httpService
      .post(process.env.AUTH_URL + '/dev/sign-up', {
        cpf: params.cpf,
      })
      .pipe(
        map((resp) => {
          return {
            message: resp.data.message,
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new BadRequestException(' Usuário já cadastrado ');
        }),
      );
  }
}
