import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { ICreateIngrediente } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateIngrendienteUseCase implements ICreateIngrediente {
  constructor(
    @Inject(IIngredienteRepository)
    private readonly ingredienteRepository: IIngredienteRepository,
  ) {}
  async execute(params: ICreateIngrediente.Params) {
    const ingrediente = new IngredienteEntity({
      calorias: params.calorias,
      custo: params.custo,
      valor: params.valor,
      nome: params.nome,
      quantidade: params.quantidade,
      id: undefined,
    });
    return this.ingredienteRepository.create({ ingrediente });
  }
}
