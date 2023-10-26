import {
  ClienteEntity,
  ComboEntity,
  IngredienteEntity,
  ItemEntity,
  PedidoEntity,
} from '@/domain/entities';
import { IPedidoRepository } from '@/domain/repository';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PedidoModelTypeOrm,
} from '@/infra/database/typerom/model';

export class CreateTypeOrmAdapter {
  public command(params: IPedidoRepository.Create.Params): PedidoModelTypeOrm {
    const typeOrmEntity = new PedidoModelTypeOrm();
    typeOrmEntity.id = params.pedido.id;
    typeOrmEntity.numero = params.pedido.numero;
    typeOrmEntity.status = params.pedido.status;
    typeOrmEntity.valor = params.pedido.valor;
    typeOrmEntity.cliente = ClienteModelTypeOrm.FromEntity(
      params.pedido.cliente,
    );
    typeOrmEntity.combos = params.pedido.combos.map(
      ComboModelTypeOrm.FromEntity,
    );
    typeOrmEntity.itens = params.pedido.itens.map(ItemModelTypeOrm.FromEntity);
    typeOrmEntity.criadoEm = params.pedido.criadoEm;
    typeOrmEntity.atualizadoEm = params.pedido.atualizadoEm;
    return typeOrmEntity;
  }

  public result(params: PedidoModelTypeOrm): PedidoEntity {
    const pedido = new PedidoEntity({
      id: params.id,
      numero: params.numero,
      status: params.status,
      valor: params.valor,
      criadoEm: params.criadoEm,
      atualizadoEm: params.atualizadoEm,
    });

    pedido.addCliente(ClienteEntity.FromTypeOrmModel(params.cliente));
    pedido.addCombos(
      params.combos.map((combo) =>
        ComboEntity.FromTypeOrmModel({
          ...combo,
          itens: combo.itens.map((item) =>
            ItemEntity.FromTypeOrmModel({
              ...item,
              ingredientes: item.ingredientes.map(
                IngredienteEntity.FromTypeOrmModel,
              ),
            }),
          ),
        }),
      ),
    );
    pedido.addItem(
      params.itens.map((item) =>
        ItemEntity.FromTypeOrmModel({
          ...item,
          ingredientes: item.ingredientes.map(
            IngredienteEntity.FromTypeOrmModel,
          ),
        }),
      ),
    );

    return pedido;
  }
}
