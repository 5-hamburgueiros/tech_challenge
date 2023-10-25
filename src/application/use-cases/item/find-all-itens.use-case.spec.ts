import { IngredienteEntity, ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import { IItemRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { FindAllItensUseCase } from './find-all-itens.use-case';

describe('FindAllItensUseCase', () => {
  let findAllItensUseCase: FindAllItensUseCase;
  let itemRepository: IItemRepository;

  beforeEach(() => {
    itemRepository = createMock<IItemRepository>();
    findAllItensUseCase = new FindAllItensUseCase(itemRepository);
  });

  it('should be defined', () => {
    expect(findAllItensUseCase).toBeDefined();
  });

  it('should call itemRepository.findAll with the provided parameters and return a list of item', async () => {
    const findParams = {
      nome: 'X-Bacon',
    };

    const expectedResult = [
      new ItemEntity({
        categoria: CategoriaItem.Lanche,
        nome: 'X-Bacon',
        valor: 19.99,
        ingredientes: [
          new IngredienteEntity({
            calorias: 100,
            custo: 5.99,
            valor: 9.99,
            nome: 'Hamburguer de Carne',
            quantidade: 10,
            id: 'fake-id',
          }),
        ],
        id: 'fake-id',
      }),
    ];

    const mockItemRepositorySpy = jest
      .spyOn(itemRepository, 'findAll')
      .mockResolvedValue(expectedResult);

    const result = await findAllItensUseCase.execute(findParams);

    expect(result).toEqual(expectedResult);
    expect(itemRepository.findAll).toHaveBeenCalledWith(findParams);
    expect(mockItemRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
