import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { ICreateExample } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateExampleUseCase implements ICreateExample {
  constructor(
    @Inject(IExampleRepository)
    private readonly exampleRepository: IExampleRepository,
  ) {}

  async execute(params: ICreateExample.Params): Promise<ExampleEntity> {
    const exampleModel = new ExampleEntity({
      id: undefined,
      email: params.email,
      name: params.name,
      active: true,
    });
    return this.exampleRepository.create({
      example: exampleModel,
    });
  }
}
