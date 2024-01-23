import { StatusPedido } from '@/domain/enum';
import { IPedidoRepository } from '@/domain/repository';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { createMock } from '@golevelup/nestjs-testing';
import { InProgressPedidoUseCase } from './in-progress-pedido.use-case';

describe('InProgressPedido', () => {
  let inProgressPedido: InProgressPedidoUseCase;
  const mockPedidoRepository = createMock<IPedidoRepository>();
  const basePedido = {
    atualizadoEm: new Date().toISOString(),
    cliente: {
      atualizadoEm: new Date().toISOString(),
      criadoEm: new Date().toISOString(),
      documento: '12345678909',
      email: 'email@teste.com',
      id: 'fake-id',
      nome: 'nome',
    },
    combos: [],
    criadoEm: new Date().toISOString(),
    historicoStatus: [],
    id: 'fake-id-123',
    itens: [],
    numero: 123,
  };

  beforeEach(() => {
    inProgressPedido = new InProgressPedidoUseCase(mockPedidoRepository);
  });

  it('deve validar se retorna os pedidos com os status corretos', async () => {
    const mockPedido: Array<PedidoModelTypeOrm> = [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { ...basePedido, status: StatusPedido.PRONTO },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { ...basePedido, status: StatusPedido.EM_PREPARACAO },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { ...basePedido, status: StatusPedido.RECEBIDO },
    ];

    console.log('mockPedido', mockPedido);

    const mockPedidoRepositorySpy = jest
      .spyOn(mockPedidoRepository, 'inProgress')
      .mockResolvedValueOnce(mockPedido);

    const result = await inProgressPedido.execute();

    expect(mockPedidoRepository.inProgress).toHaveBeenCalled();
    expect(result).toEqual(mockPedido);
    expect(result[0].status).toEqual(StatusPedido.PRONTO);
    expect(result[1].status).toEqual(StatusPedido.EM_PREPARACAO);
    expect(result[2].status).toEqual(StatusPedido.RECEBIDO);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
