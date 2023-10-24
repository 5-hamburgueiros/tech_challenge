import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTypeOrmAdapter,
  FetchAllByActiveStatusTypeOrmAdapter,
  FindByIdTypeOrmAdapter,
} from './adapter';

@Injectable()
export class ExampleRepositoryTypeOrm implements IExampleRepository {
  constructor(
    @InjectRepository(ExampleModelTypeOrm)
    private readonly exampleRepository: Repository<ExampleModelTypeOrm>,
  ) {}

  async create(
    params: IExampleRepository.Create.Params,
  ): Promise<ExampleEntity> {
    const adapter = new CreateTypeOrmAdapter();
    const data = adapter.command(params);
    const result = await this.exampleRepository.save(data);
    return adapter.result(result);
  }

  async findById(
    params: IExampleRepository.FindById.Params,
  ): Promise<ExampleEntity> {
    const result = await this.exampleRepository.findOneBy({
      id: params.id,
    });
    const adapter = new FindByIdTypeOrmAdapter();
    return adapter.result(result);
  }

  async fetchAllByActiveStatus(
    params: IExampleRepository.FetchAllByActiveStatus.Params,
  ): Promise<IExampleRepository.FetchAllByActiveStatus.Result> {
    const result = await this.exampleRepository.findBy({
      isActive: params.isActive,
    });
    const adapter = new FetchAllByActiveStatusTypeOrmAdapter();
    return adapter.result(result);
  }
}
