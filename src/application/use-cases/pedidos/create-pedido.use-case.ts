import { PedidoEntity } from '@/domain/entities';
import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { ClienteNaoLocalizadoException } from '@/domain/exceptions';
import {
  IClienteRepository,
  IComboRepository,
  IItemRepository,
  IPedidoRepository,
} from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { ICreatePedido } from '@/domain/use-cases';
import { ICriaPagamento } from '@/domain/use-cases/pagamento/cria-pagamento.use-case';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreatePedidoUseCase implements ICreatePedido {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    @Inject(IComboRepository)
    private readonly comboRepository: IComboRepository,
    @Inject(IPedidoHistoricoRepository)
    private readonly pedidoHistoricoRepository: IPedidoHistoricoRepository,
    @Inject(ICriaPagamento)
    private readonly criaPagamentoUseCase: ICriaPagamento,
  ) {}

  async execute(params: ICreatePedido.Params): Promise<PedidoEntity> {
    const numeroPedido = await this.pedidoRepository.getNumeroPedido();
    const pedido = new PedidoEntity({
      numero: numeroPedido,
      id: undefined,
      status: undefined,
    });
    if (params.cliente) {
      const cliente = await this.clienteRepository.findByDocumento({
        documento: params.cliente,
      });
      if (!cliente) {
        throw new ClienteNaoLocalizadoException(
          'Cliente não localizado para o documento informado',
        );
      } else {
        pedido.addCliente(cliente);
      }
    }

    if (params.itens) {
      const itens = await this.itemRepository.findAll({
        ids: params.itens,
      });
      pedido.addItem(itens);
    }

    if (params.combos) {
      const combos = await this.comboRepository.findAll({
        ids: params.combos,
      });
      pedido.addCombos(combos);
    }

    pedido.fecharPedido();

    const pedidoCriado = await this.pedidoRepository.create({
      pedido,
    });

    const historico = new PedidoHistoricoEntity({
      id: undefined,
      pedido: pedidoCriado.id,
      status: pedidoCriado.status,
    });

    await this.pedidoHistoricoRepository.create({
      historico,
    });

    const pagamento = await this.criaPagamentoUseCase.execute({
      pedido: pedidoCriado,
    });
    pedidoCriado.pagamento = pagamento;

    return pedidoCriado;
  }
}
