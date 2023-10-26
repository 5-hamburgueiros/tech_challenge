import { ComboEntity, IngredienteEntity, ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import { IComboRepository, IItemRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { CreateComboUseCase } from './create-combo.use-case';

describe('CreateComboUseCase', () => {
  let createComboUseCase: CreateComboUseCase;
  let comboRepository: IComboRepository;
  let itemRepository: IItemRepository;

  beforeEach(() => {
    comboRepository = createMock<IComboRepository>();
    itemRepository = createMock<IItemRepository>();
    createComboUseCase = new CreateComboUseCase(
      comboRepository,
      itemRepository,
    );
  });

  it('should be defined', () => {
    expect(createComboUseCase).toBeDefined();
  });

  it('Deve criar um combo com lanche, batata e bebida', async () => {
    const lanche = new ItemEntity({
      id: 'itemId1',
      nome: 'X-Bacon',
      categoria: CategoriaItem.Lanche,
      valor: 9.99,
      ingredientes: [
        new IngredienteEntity({
          id: 'ingredientId1',
          nome: 'Hamburguer de Carne',
          valor: 5.99,
          custo: 2.99,
          calorias: 100,
          quantidade: 10,
        }),
      ],
    });

    const acompanhamento = new ItemEntity({
      id: 'itemId2',
      nome: 'Batata Frita Grande',
      categoria: CategoriaItem.Acompanhamento,
      valor: 9.99,
    });

    const bebida = new ItemEntity({
      id: 'itemId3',
      nome: 'Coca-Cola 500ml',
      categoria: CategoriaItem.Bebida,
      valor: 9.99,
    });

    const createParams = {
      nome: 'X-Bacon, Batata Frita Grande e Coca-Cola 500ml',
      valor: 9.99,
      items: [lanche.id, acompanhamento.id, bebida.id],
      ativo: true,
    };

    const mockCombo = new ComboEntity({
      nome: createParams.nome,
      valor: createParams.valor,
      ativo: true,
      itens: [lanche, acompanhamento, bebida],
    });

    const mockItemRepositorySpy = jest
      .spyOn(itemRepository, 'findAll')
      .mockResolvedValue([lanche, acompanhamento, bebida]);

    const mockComboRepositorySpy = jest
      .spyOn(comboRepository, 'create')
      .mockResolvedValue(mockCombo);

    const result = await createComboUseCase.execute(createParams);

    expect(result).toEqual(mockCombo);
    expect(result).toBeInstanceOf(ComboEntity);
    expect(comboRepository.create).toHaveBeenCalledTimes(1);
    expect(mockComboRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockItemRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
