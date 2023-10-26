import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { FindAllIngredientsUseCase } from './find-all-ingredientes.use-case';

describe('FindAllIngredientsUseCase', () => {
  let findAllIngredientsUseCase: FindAllIngredientsUseCase;
  let ingredienteRepository: IIngredienteRepository;

  beforeEach(() => {
    ingredienteRepository = createMock<IIngredienteRepository>();
    findAllIngredientsUseCase = new FindAllIngredientsUseCase(
      ingredienteRepository,
    );
  });

  it('should be defined', () => {
    expect(findAllIngredientsUseCase).toBeDefined();
  });

  it('should call ingredienteRepository.findAll with the provided parameters and return a list of entities', async () => {
    const findParams = {
      nome: 'Hamburguer de Carne',
    };

    const expectedResult = [
      new IngredienteEntity({
        calorias: 100,
        custo: 5.99,
        valor: 9.99,
        nome: 'Hamburguer de Carne',
        quantidade: 10,
        id: 'fake-id',
      }),
    ];

    const mockIngredienteRepositorySpy = jest
      .spyOn(ingredienteRepository, 'findAll')
      .mockResolvedValue(expectedResult);

    const result = await findAllIngredientsUseCase.execute(findParams);

    expect(result).toEqual(expectedResult);
    expect(ingredienteRepository.findAll).toHaveBeenCalledWith(findParams);
    expect(mockIngredienteRepositorySpy).toHaveBeenCalledTimes(1);
  });
  it('should call ingredienteRepository.findAll with the provided parameters and return an empty list of entities', async () => {
    const findParams = {
      nome: 'Hamburguer de Carne',
    };

    const expectedResult = [];

    const mockIngredienteRepositorySpy = jest
      .spyOn(ingredienteRepository, 'findAll')
      .mockResolvedValue(expectedResult);

    const result = await findAllIngredientsUseCase.execute(findParams);

    expect(result).toEqual(expectedResult);
    expect(ingredienteRepository.findAll).toHaveBeenCalledWith(findParams);
    expect(mockIngredienteRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
