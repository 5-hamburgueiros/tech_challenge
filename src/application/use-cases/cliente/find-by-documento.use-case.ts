import { ClienteEntity } from '@/domain/entities';
import { DocumentoCadastradoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { IFindByDocumento } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByDocumentUseCase implements IFindByDocumento {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(params: IFindByDocumento.Params): Promise<ClienteEntity> {
    const exists = await this.clienteRepository.findByDocumento({
      documento: params.documento,
    });
    if (!exists) {
      throw new DocumentoCadastradoException(
        'Documento não cadastrado no sistema',
      );
    }
    return exists;
  }
}
