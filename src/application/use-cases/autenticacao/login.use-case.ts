import { AutenticacaoEntity } from '@/domain/entities';
import { BadRequestException } from '@/domain/exceptions';
import { ILogin } from '@/domain/use-cases';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class LoginUseCase implements ILogin {
  constructor(private readonly httpService: HttpService) {}

  async execute(
    params: ILogin.Params,
  ): Promise<Observable<AutenticacaoEntity>> {
    return this.httpService
      .post(process.env.AUTH_URL + '/dev/auth/token', {
        cpf: params.cpf,
      })
      .pipe(
        map((resp) => {
          return {
            cpf: params.cpf,
            accessToken: resp.data.accessToken,
            refreshToken: resp.data.refreshToken,
            type: resp.data.type,
            expiresIn: resp.data.expiresIn,
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new BadRequestException(' Usuário ou senha inválida ');
        }),
      );
  }
}
