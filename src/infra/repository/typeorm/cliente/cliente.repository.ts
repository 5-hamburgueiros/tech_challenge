import { ClienteEntity } from '@/domain/entities';
import { IClienteRepository } from '@/domain/repository';
import { ClienteModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeOrmAdapter, FindByDocumentTypeOrmAdapter } from './adapter';

@Injectable()
export class ClienteRepositoryTypeOrm implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteModelTypeOrm)
    private readonly clienteRepository: Repository<ClienteModelTypeOrm>,
  ) {}

  async create(
    params: IClienteRepository.Create.Params,
  ): Promise<ClienteEntity> {
    const adapter = new CreateTypeOrmAdapter();
    const data = adapter.command(params);
    const result = await this.clienteRepository.save(data);
    return adapter.result(result);
  }

  async findByDocument(
    params: IClienteRepository.FindByDocument.Params,
  ): Promise<ClienteEntity> {
    const adapter = new FindByDocumentTypeOrmAdapter();
    const data = await this.clienteRepository.findOneBy({
      documento: params.document,
    });
    const result = adapter.result(data);
    return result;
  }
}
