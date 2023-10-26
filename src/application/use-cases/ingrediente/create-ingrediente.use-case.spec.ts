import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { CreateIngrendienteUseCase } from './create-ingrediente.use-case';

describe('CreateIngrendienteUseCase', () => {
  let createIngredienteUseCase: CreateIngrendienteUseCase;
  let ingredienteRepository: IIngredienteRepository;

  beforeEach(() => {
    ingredienteRepository = createMock<IIngredienteRepository>();
    createIngredienteUseCase = new CreateIngrendienteUseCase(
      ingredienteRepository,
    );
  });

  it('should be defined', () => {
    expect(createIngredienteUseCase).toBeDefined();
  });

  it('should create an ingrediente entity', async () => {
    const createParams = {
      calorias: 100,
      custo: 5.99,
      valor: 9.99,
      nome: 'Ingredient Name',
      quantidade: 10,
    };

    const mockIngrediente = new IngredienteEntity({
      calorias: createParams.calorias,
      custo: createParams.custo,
      valor: createParams.valor,
      nome: createParams.nome,
      quantidade: createParams.quantidade,
      id: 'fake-id',
      atualizadoEm: 'fake-date',
      criadoEm: 'fake-date',
    });

    const mockIngredienteRepositorySpy = jest
      .spyOn(ingredienteRepository, 'create')
      .mockResolvedValue(mockIngrediente);

    const result = await createIngredienteUseCase.execute(createParams);

    expect(result).toEqual(mockIngrediente);
    expect(ingredienteRepository.create).toHaveBeenCalledTimes(1);
    expect(mockIngredienteRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
