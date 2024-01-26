import { PaymentsStatusMercadoPagoResponseDto } from '@/api/dtos/mercado-pago/create-pagamento-mercado-pago-response.dto copy';
import { PagamentoEntity, PedidoEntity } from '@/domain/entities';
import { StatusPagamento, StatusPedido } from '@/domain/enum';
import { ErroIntegracaoMercadoPagoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { IFindById } from '@/domain/use-cases';
import { createMock } from '@golevelup/nestjs-testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AtualizaPagamentoUseCase } from './atualiza-pagamento.use-case';

describe('AtualizaPagamentoUseCase', () => {

  let httpService: HttpService;
  let findPedidoByIdUseCase: IFindById;
  let pedidoRepository: IPedidoRepository;
  let pedidoHistoricoRepository: IPedidoHistoricoRepository;
  let configService: ConfigService;

  let atualizaPagamentoUseCase: AtualizaPagamentoUseCase;

  beforeEach(() => {

    httpService = createMock<HttpService>();
    findPedidoByIdUseCase = createMock<IFindById>();
    pedidoRepository = createMock<IPedidoRepository>();
    pedidoHistoricoRepository = createMock<IPedidoHistoricoRepository>();
    configService = createMock<ConfigService>();

    jest.spyOn(configService, 'get').mockImplementation(() => 'valor');

    atualizaPagamentoUseCase = new AtualizaPagamentoUseCase(
      httpService,
      findPedidoByIdUseCase,
      pedidoRepository,
      pedidoHistoricoRepository,
      configService
    );
  });

  it('should be defined', () => {
    expect(atualizaPagamentoUseCase).toBeDefined();
  });

  it('should return StatusPagamento.PAGO', async () => {
    const idExterno = '123';
    jest.spyOn(httpService, 'get')
      .mockImplementation(() => of(mockPaidResponseMercadoPagoPayments));
    jest.spyOn(findPedidoByIdUseCase, 'execute')
      .mockResolvedValueOnce(pedido);
    jest.spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(pedidoPago);
    jest.spyOn(pedidoHistoricoRepository, 'create')
      .mockResolvedValueOnce(null);

    const result = await atualizaPagamentoUseCase.execute(idExterno);

    expect(result).toEqual(StatusPagamento.PAGO);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(pedidoHistoricoRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should NOT return StatusPagamento.PAGO', async () => {
    const idExterno = '123';
    jest.spyOn(httpService, 'get')
      .mockImplementation(() => of(mockNotPaidResponseMercadoPagoPayments));
    jest.spyOn(findPedidoByIdUseCase, 'execute')
      .mockResolvedValueOnce(pedido);
    jest.spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(pedido);
    jest.spyOn(pedidoHistoricoRepository, 'create')
      .mockResolvedValueOnce(null);

    const result = await atualizaPagamentoUseCase.execute(idExterno);

    expect(result).not.toEqual(StatusPagamento.PAGO);
    expect(pedidoRepository.create).toHaveBeenCalledTimes(1);
    expect(pedidoHistoricoRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw ErroIntegracaoMercadoPagoException', async () => {
    const idExterno = '123';
    jest.spyOn(httpService, 'get')
      .mockImplementation(() => {throw new Error()});
    jest.spyOn(findPedidoByIdUseCase, 'execute')
      .mockResolvedValueOnce(pedido);
    jest.spyOn(pedidoRepository, 'create')
      .mockResolvedValueOnce(pedido);
    jest.spyOn(pedidoHistoricoRepository, 'create')
      .mockResolvedValueOnce(null);
    jest.spyOn(pedido, 'adicionaPagamento');

    await expect(atualizaPagamentoUseCase.execute(idExterno)).rejects.toThrowError(ErroIntegracaoMercadoPagoException);
  });

});

const mockPaidResponseMercadoPagoPayments = {
  "status": 200,
  "statusText": '',
  "headers": {},
  "config": {},
  "data": {
    "external_reference": "a46a329d-be7c-4d72-a942-efe1d9bf94dc",
    "status": PaymentsStatusMercadoPagoResponseDto.APPROVED,
    "transaction_amount": 40.7,
  }
};

const mockNotPaidResponseMercadoPagoPayments = {
  "status": 200,
  "statusText": '',
  "headers": {},
  "config": {},
  "data": {
    "external_reference": "a46a329d-be7c-4d72-a942-efe1d9bf94dc",
    "status": PaymentsStatusMercadoPagoResponseDto.CANCELLED,
    "transaction_amount": 40.7,
  }
};

const pedido = new PedidoEntity({
  numero: 1234,
  status: StatusPedido.AGUARDANDO_PAGAMENTO,
  pagamento: new PagamentoEntity({
    status: StatusPagamento.AGUARDANDO_PAGAMENTO,
  })
});
const pedidoPago = new PedidoEntity({
  numero: 1234,
  status: StatusPedido.PAGO,
  pagamento: new PagamentoEntity({
     status: StatusPagamento.PAGO,
  })
});