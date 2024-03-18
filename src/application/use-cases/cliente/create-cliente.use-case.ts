import { ClienteEntity } from '@/domain/entities';
import { DocumentoCadastradoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { ICreateCliente } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SignUpUseCase } from '../autenticacao/sign-up.use-case';

@Injectable()
export class CreateClienteUseCase implements ICreateCliente {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(SignUpUseCase)
    private readonly signup: SignUpUseCase,
  ) {}

  async execute(params: ICreateCliente.Params): Promise<ClienteEntity> {
    const exists = await this.clienteRepository.findByDocumento({
      documento: params.documento,
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

    lastValueFrom(
      await this.signup.execute({
        cpf: clienteModel.documento,
      }),
    );
    return this.clienteRepository.create({
      cliente: clienteModel,
    });
  }
}
