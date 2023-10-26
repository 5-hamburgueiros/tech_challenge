import { IComboRepository } from '@/domain/repository';
import { IFindAllCombos } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCombosUseCase implements IFindAllCombos {
  constructor(
    @Inject(IComboRepository)
    private readonly comboRepository: IComboRepository,
  ) {}

  async execute(params: IFindAllCombos.Params): Promise<IFindAllCombos.Result> {
    return this.comboRepository.findAll(params);
  }
}
