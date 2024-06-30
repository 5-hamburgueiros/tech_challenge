import { ClienteNaoLocalizadoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { IDeleteCliente } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../autenticacao/sign-up.use-case';

@Injectable()
export class DeleteClienteUseCase implements IDeleteCliente {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(SignUpUseCase)
    private readonly signup: SignUpUseCase,
  ) {}

  async execute(params: IDeleteCliente.Params): Promise<void> {
    const exists = await this.clienteRepository.findByDocumento({
      documento: params.documento,
    });
    if (!exists) {
      throw new ClienteNaoLocalizadoException(
        'Documento nao localizado no sistema',
      );
    }
    await this.clienteRepository.delete({
      documento: params.documento,
    });
  }
}
