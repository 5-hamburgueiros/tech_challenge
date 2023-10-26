import { IngredienteEntity, ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import { IIngredienteRepository, IItemRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { CreateItemUseCase } from './create-item.use-case';

describe('CreateItemUseCase', () => {
  let createItemUseCase: CreateItemUseCase;
  let itemRepository: IItemRepository;
  let ingredienteRepository: IIngredienteRepository;

  beforeEach(() => {
    itemRepository = createMock<IItemRepository>();

    ingredienteRepository = createMock<IIngredienteRepository>();

    createItemUseCase = new CreateItemUseCase(
      itemRepository,
      ingredienteRepository,
    );
  });

  it('should be defined', () => {
    expect(createItemUseCase).toBeDefined();
  });

  it('should create an item without ingredients', async () => {
    const createParams = {
      categoria: CategoriaItem.Acompanhamento,
      nome: 'Batata Frita Grande',
      valor: 9.99,
      ingredientes: [], // No ingredients
    };

    const mockItem = new ItemEntity({
      categoria: createParams.categoria,
      nome: createParams.nome,
      valor: createParams.valor,
      ingredientes: [],
    });

    const mockitemRepositorySpy = jest
      .spyOn(itemRepository, 'create')
      .mockResolvedValue(mockItem);

    const result = await createItemUseCase.execute(createParams);

    expect(result).toEqual(mockItem);
    expect(result).toBeInstanceOf(ItemEntity);
    expect(ingredienteRepository.findAll).not.toHaveBeenCalled();
    expect(itemRepository.create).toHaveBeenCalledTimes(1);
    expect(mockitemRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('should create an item with ingredients', async () => {
    const createParams = {
      categoria: CategoriaItem.Lanche,
      nome: 'X-Bacon',
      valor: 19.99,
      ingredientes: ['ingredientId1', 'ingredientId2'],
    };

    const mockIngredients = [
      new IngredienteEntity({
        id: 'ingredientId1',
        nome: 'Hamburguer de Carne',
        valor: 5.99,
        custo: 2.99,
        calorias: 100,
        quantidade: 10,
      }),
      new IngredienteEntity({
        id: 'ingredientId2',
        nome: 'Queijo',
        valor: 1.99,
        custo: 0.99,
        calorias: 50,
        quantidade: 10,
      }),
    ];

    const mockItem = new ItemEntity({
      categoria: createParams.categoria,
      nome: createParams.nome,
      valor: createParams.valor,
      ingredientes: mockIngredients,
    });

    const mockIngredienteRepositorySpy = jest
      .spyOn(ingredienteRepository, 'findAll')
      .mockResolvedValue(mockIngredients);

    const mockitemRepositorySpy = jest
      .spyOn(itemRepository, 'create')
      .mockResolvedValue(mockItem);
    const result = await createItemUseCase.execute(createParams);

    expect(result).toEqual(mockItem);
    expect(result).toBeInstanceOf(ItemEntity);
    expect(ingredienteRepository.findAll).toHaveBeenCalledWith({
      ids: createParams.ingredientes,
    });
    expect(itemRepository.create).toHaveBeenCalledTimes(1);
    expect(mockIngredienteRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockitemRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
