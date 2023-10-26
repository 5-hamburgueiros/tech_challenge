import { PedidoEntity } from '@/domain/entities';
import { IPedidoRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { InternalServerErrorException } from '@nestjs/common';
import { FindPedidoByIdUseCase } from './find-by-id.use-case';

describe('FindPedidoById', () => {
  let findPedidoById: FindPedidoByIdUseCase;
  const mockPedidoRepository = createMock<IPedidoRepository>();

  beforeEach(() => {
    findPedidoById = new FindPedidoByIdUseCase(mockPedidoRepository);
  });

  it('deve retornar pedido pelo id', async () => {
    const mockPedido = new PedidoEntity({
      id: 'fake-id',
      numero: 1234,
    });
    const mockPedidoRepositorySpy = jest
      .spyOn(mockPedidoRepository, 'findById')
      .mockResolvedValueOnce(mockPedido);

    const result = await findPedidoById.execute({ id: 'fake-id' });

    expect(mockPedidoRepository.findById).toHaveBeenCalledWith({
      id: 'fake-id',
    });
    expect(result).toEqual(mockPedido);
    expect(mockPedidoRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('deve lançar exceção PedidoNaoLocalizadoException', async () => {
    const mockPedidoRepositorySpy = jest
      .spyOn(mockPedidoRepository, 'findById')
      .mockResolvedValueOnce(null);

    await expect(findPedidoById.execute({ id: 'fake-id' })).rejects.toThrow();
    expect(mockPedidoRepositorySpy).toHaveBeenCalledWith({
      id: 'fake-id',
    });
  });

  it('should throw InternalServerErrorException on repository error', async () => {
    mockPedidoRepository.findById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(findPedidoById.execute({ id: 'fake-id' })).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
