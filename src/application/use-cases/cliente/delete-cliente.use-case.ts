import { ClienteNaoLocalizadoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { AwsCognitoService } from '@/domain/service';
import { IDeleteCliente } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteClienteUseCase implements IDeleteCliente {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(AwsCognitoService)
    private readonly awsCognitoService: AwsCognitoService,
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
    await this.awsCognitoService.deleteCliente(params.documento);
  }
}
