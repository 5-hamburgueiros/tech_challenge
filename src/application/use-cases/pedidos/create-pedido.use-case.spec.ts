import {
  ClienteEntity,
  ComboEntity,
  ItemEntity,
  PedidoEntity,
} from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import {
  IClienteRepository,
  IComboRepository,
  IItemRepository,
  IPedidoRepository,
} from '@/domain/repository';
import { ICreatePedido } from '@/domain/use-cases';
import { createMock } from '@golevelup/nestjs-testing';
import { CreatePedidoUseCase } from './create-pedido.use-case';

describe('CreatePedidoUseCase', () => {
  let createPedidoUseCase: CreatePedidoUseCase;
  let pedidoRepository: IPedidoRepository;
  let clienteRepository: IClienteRepository;
  let itemRepository: IItemRepository;
  let comboRepository: IComboRepository;

  beforeEach(() => {
    pedidoRepository = createMock<IPedidoRepository>();
    clienteRepository = createMock<IClienteRepository>();
    itemRepository = createMock<IItemRepository>();
    comboRepository = createMock<IComboRepository>();

    createPedidoUseCase = new CreatePedidoUseCase(
      pedidoRepository,
      clienteRepository,
      itemRepository,
      comboRepository,
    );
  });

  it('should be defined', () => {
    expect(createPedidoUseCase).toBeDefined();
  });
  it('deve lançar exceção caso cliente informado não exista na base', async () => {
    const mockItem = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });

    const createParams: ICreatePedido.Params = {
      itens: [mockItem.id],
      cliente: '12345678900',
    };
    const mockClienteRepositorySpy = jest
      .spyOn(clienteRepository, 'findByDocumento')
      .mockResolvedValueOnce(null);

    await expect(createPedidoUseCase.execute(createParams)).rejects.toThrow();
    expect(mockClienteRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('deve criar um pedido apenas com itens e com cliente informado', async () => {
    const mockCliente = new ClienteEntity({
      documento: '12345678900',
      email: 'teste@example.com',
      nome: 'teste',
      id: '12345678900',
    });

    const mockItem = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });

    const mockPedido = new PedidoEntity({
      numero: 1234,
    });
    mockPedido.addCliente(mockCliente);
    mockPedido.addItem([mockItem]);
    mockPedido.fecharPedido();
    const createParams: ICreatePedido.Params = {
      cliente: mockCliente.documento,
      itens: [mockItem.id],
    };

    const mockPedidoRepositorySpy = jest
      .spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(mockPedido);
    const mockClienteRepositorySpy = jest
      .spyOn(clienteRepository, 'findByDocumento')
      .mockResolvedValueOnce(mockCliente);
    const mockItemRepositorySpy = jest
      .spyOn(itemRepository, 'findAll')
      .mockResolvedValueOnce([mockItem]);

    const result = await createPedidoUseCase.execute(createParams);

    expect(result).toEqual(mockPedido);
    expect(result.valor).toEqual(mockPedido.valor);
    expect(result.status).toEqual(mockPedido.status);
    expect(result).toBeInstanceOf(PedidoEntity);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockClienteRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockItemRepositorySpy).toHaveBeenCalledTimes(1);
  });
  it('deve criar um pedido apenas com itens sem cliente informado', async () => {
    const mockItem = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });

    const mockPedido = new PedidoEntity({
      numero: 1234,
    });
    mockPedido.addItem([mockItem]);
    mockPedido.fecharPedido();

    const createParams: ICreatePedido.Params = {
      itens: [mockItem.id],
    };

    const mockPedidoRepositorySpy = jest
      .spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(mockPedido);

    const mockItemRepositorySpy = jest
      .spyOn(itemRepository, 'findAll')
      .mockResolvedValueOnce([mockItem]);

    const result = await createPedidoUseCase.execute(createParams);

    expect(result).toEqual(mockPedido);
    expect(result.valor).toEqual(mockPedido.valor);
    expect(result.status).toEqual(mockPedido.status);
    expect(result).toBeInstanceOf(PedidoEntity);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockItemRepositorySpy).toHaveBeenCalledTimes(1);
  });
  it('deve criar um pedido apenas com combos sem cliente informado', async () => {
    const mockItem1 = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });
    const mockItem2 = new ItemEntity({
      categoria: CategoriaItem.Lanche,
      nome: 'X-Bacon',
      valor: 25.99,
      id: 'itemId2',
    });
    const mockItem3 = new ItemEntity({
      categoria: CategoriaItem.Acompanhamento,
      nome: 'Batata Frita',
      valor: 7.99,
      id: 'itemId3',
    });

    const mockCombo = new ComboEntity({
      id: 'comboId1',
      nome: 'Combo 1',
      ativo: true,
      valor: 29.99,
      itens: [mockItem1, mockItem2, mockItem3],
    });

    const mockPedido = new PedidoEntity({
      numero: 1234,
    });
    mockPedido.addCombos([mockCombo]);
    mockPedido.fecharPedido();

    const createParams: ICreatePedido.Params = {
      combos: [mockCombo.id],
    };

    const mockPedidoRepositorySpy = jest
      .spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(mockPedido);

    const mockComboRepositorySpy = jest
      .spyOn(comboRepository, 'findAll')
      .mockResolvedValueOnce([mockCombo]);

    const result = await createPedidoUseCase.execute(createParams);

    expect(result).toEqual(mockPedido);
    expect(result.valor).toEqual(mockPedido.valor);
    expect(result.status).toEqual(mockPedido.status);
    expect(result).toBeInstanceOf(PedidoEntity);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockComboRepositorySpy).toHaveBeenCalledTimes(1);
  });
  it('deve criar um pedido apenas com combos com cliente informado', async () => {
    const mockItem1 = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });
    const mockItem2 = new ItemEntity({
      categoria: CategoriaItem.Lanche,
      nome: 'X-Bacon',
      valor: 25.99,
      id: 'itemId2',
    });
    const mockItem3 = new ItemEntity({
      categoria: CategoriaItem.Acompanhamento,
      nome: 'Batata Frita',
      valor: 7.99,
      id: 'itemId3',
    });

    const mockCombo = new ComboEntity({
      id: 'comboId1',
      nome: 'Combo 1',
      ativo: true,
      valor: 29.99,
      itens: [mockItem1, mockItem2, mockItem3],
    });

    const mockCliente = new ClienteEntity({
      documento: '12345678900',
      email: 'teste@example.com',
      nome: 'teste',
      id: '12345678900',
    });

    const mockPedido = new PedidoEntity({
      numero: 1234,
    });
    mockPedido.addCombos([mockCombo]);
    mockPedido.addCliente(mockCliente);
    mockPedido.fecharPedido();
    const createParams: ICreatePedido.Params = {
      combos: [mockCombo.id],
      cliente: mockCliente.documento,
    };

    const mockPedidoRepositorySpy = jest
      .spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(mockPedido);

    const mockComboRepositorySpy = jest
      .spyOn(comboRepository, 'findAll')
      .mockResolvedValueOnce([mockCombo]);

    const mockClienteRepositorySpy = jest
      .spyOn(clienteRepository, 'findByDocumento')
      .mockResolvedValueOnce(mockCliente);

    const result = await createPedidoUseCase.execute(createParams);

    expect(result).toEqual(mockPedido);
    expect(result.valor).toEqual(mockPedido.valor);
    expect(result.status).toEqual(mockPedido.status);
    expect(result).toBeInstanceOf(PedidoEntity);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(mockClienteRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockComboRepositorySpy).toHaveBeenCalledTimes(1);
  });
  it('deve criar um pedido com combos, itens e cliente informado', async () => {
    const mockItem1 = new ItemEntity({
      categoria: CategoriaItem.Bebida,
      nome: 'Coca-Cola',
      valor: 5.99,
      id: 'itemId1',
    });
    const mockItem2 = new ItemEntity({
      categoria: CategoriaItem.Lanche,
      nome: 'X-Bacon',
      valor: 25.99,
      id: 'itemId2',
    });
    const mockItem3 = new ItemEntity({
      categoria: CategoriaItem.Acompanhamento,
      nome: 'Batata Frita',
      valor: 7.99,
      id: 'itemId3',
    });
    const mockItem4 = new ItemEntity({
      categoria: CategoriaItem.Acompanhamento,
      nome: 'Molho da casa',
      valor: 3.99,
      id: 'itemId4',
    });
    const mockCombo = new ComboEntity({
      id: 'comboId1',
      nome: 'Combo 1',
      ativo: true,
      valor: 29.99,
      itens: [mockItem1, mockItem2, mockItem3],
    });

    const mockCliente = new ClienteEntity({
      documento: '12345678900',
      email: 'teste@example.com',
      nome: 'teste',
      id: '12345678900',
    });

    const mockPedido = new PedidoEntity({
      numero: 1234,
    });
    mockPedido.addCombos([mockCombo]);
    mockPedido.addCliente(mockCliente);
    mockPedido.addItem([mockItem4]);
    mockPedido.fecharPedido();
    const createParams: ICreatePedido.Params = {
      combos: [mockCombo.id],
      cliente: mockCliente.documento,
      itens: [mockItem4.id],
    };

    const mockPedidoRepositorySpy = jest
      .spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(mockPedido);

    const mockItemRepositorySpy = jest
      .spyOn(itemRepository, 'findAll')
      .mockResolvedValueOnce([mockItem4]);

    const mockComboRepositorySpy = jest
      .spyOn(comboRepository, 'findAll')
      .mockResolvedValueOnce([mockCombo]);

    const mockClienteRepositorySpy = jest
      .spyOn(clienteRepository, 'findByDocumento')
      .mockResolvedValueOnce(mockCliente);

    const result = await createPedidoUseCase.execute(createParams);

    expect(result).toEqual(mockPedido);
    expect(result.valor).toEqual(mockPedido.valor);
    expect(result.status).toEqual(mockPedido.status);
    expect(result).toBeInstanceOf(PedidoEntity);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(mockClienteRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockComboRepositorySpy).toHaveBeenCalledTimes(1);
    expect(mockItemRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
