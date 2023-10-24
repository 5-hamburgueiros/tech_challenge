import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { IFindById } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdUseCase implements IFindById {
  constructor(
    @Inject(IExampleRepository)
    private readonly exampleRepository: IExampleRepository,
  ) {}

  async execute(params: IFindById.Params): Promise<ExampleEntity> {
    return this.exampleRepository.findById(params);
  }
}
