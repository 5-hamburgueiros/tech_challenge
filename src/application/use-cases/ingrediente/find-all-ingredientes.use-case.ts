import { IIngredienteRepository } from '@/domain/repository';
import { IFindAllIngredientes } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllIngredientsUseCase implements IFindAllIngredientes {
  constructor(
    @Inject(IIngredienteRepository)
    private readonly ingredienteRepository: IIngredienteRepository,
  ) {}
  execute(
    params: IFindAllIngredientes.Params,
  ): Promise<IFindAllIngredientes.Result> {
    return this.ingredienteRepository.findAll(params);
  }
}
