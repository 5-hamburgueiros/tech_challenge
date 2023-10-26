import { ClienteEntity } from '@/domain/entities';
import { DocumentoCadastradoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { ICreateCliente } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateClienteUseCase implements ICreateCliente {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(params: ICreateCliente.Params): Promise<ClienteEntity> {
    const exists = await this.clienteRepository.findByDocument({
      document: params.documento,
    });
    if (exists) {
      throw new DocumentoCadastradoException(
        'Documento já cadastrado no sistema',
      );
    }
    const clienteModel = new ClienteEntity({
      id: undefined,
      email: params.email,
      nome: params.nome,
      documento: params.documento,
    });
    return this.clienteRepository.create({
      cliente: clienteModel,
    });
  }
}
