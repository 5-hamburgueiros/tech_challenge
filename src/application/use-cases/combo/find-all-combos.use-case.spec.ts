import { ComboEntity, IngredienteEntity, ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import { IComboRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { FindAllCombosUseCase } from './find-all-combos.use-case';

describe('FindAllCombosUseCase', () => {
  let findAllCombosUseCase: FindAllCombosUseCase;
  let comboRepository: IComboRepository;

  beforeEach(() => {
    comboRepository = createMock<IComboRepository>();
    findAllCombosUseCase = new FindAllCombosUseCase(comboRepository);
  });

  it('should be defined', () => {
    expect(findAllCombosUseCase).toBeDefined();
  });

  it('should call comboRepository.findAll with the provided parameters and return a list of combos', async () => {
    const findParams = {};

    const expectedResult = [
      new ComboEntity({
        ativo: true,
        nome: 'X-Bacon',
        valor: 19.99,
        itens: [
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
          new ItemEntity({
            categoria: CategoriaItem.Acompanhamento,
            nome: 'Batata Frita Grande',
            valor: 9.99,
            id: 'fake-id',
          }),
          new ItemEntity({
            categoria: CategoriaItem.Acompanhamento,
            nome: 'Coca-Cola 500ml',
            valor: 8.99,
            id: 'fake-id',
          }),
        ],
        id: 'fake-id',
      }),
    ];

    const mockComboRepositorySpy = jest
      .spyOn(comboRepository, 'findAll')
      .mockResolvedValue(expectedResult);

    const result = await findAllCombosUseCase.execute(findParams);

    expect(result).toEqual(expectedResult);
    expect(comboRepository.findAll).toHaveBeenCalledWith(findParams);
    expect(mockComboRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
