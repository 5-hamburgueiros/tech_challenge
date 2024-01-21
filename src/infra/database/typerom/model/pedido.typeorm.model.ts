import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PagamentoModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
} from '.';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Pedido' })
@Index(['id'])
export class PedidoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Numero' })
  numero: number;

  @Column({ name: 'Valor', type: 'float' })
  valor: number;

  @Column({ name: 'Status' })
  status: StatusPedido;

  @ManyToOne(() => ClienteModelTypeOrm, (cliente) => cliente)
  public cliente: ClienteModelTypeOrm;

  @ManyToMany(() => ItemModelTypeOrm)
  @JoinTable({ name: 'Pedido_Item' })
  public itens: ItemModelTypeOrm[];

  @ManyToMany(() => ComboModelTypeOrm)
  @JoinTable({ name: 'Pedido_Combo' })
  public combos: ComboModelTypeOrm[];

  @OneToMany(() => PedidoHistoricoModelTypeOrm, (historico) => historico.pedido)
  historicoStatus: Array<PedidoHistoricoModelTypeOrm>;

  @OneToOne(() => PagamentoModelTypeOrm, (pagamento) => pagamento.pedido)
  pagamento: PagamentoModelTypeOrm;

  static FromEntity(params: PedidoEntity): PedidoModelTypeOrm {
    const model = new PedidoModelTypeOrm();
    model.id = params.id;
    model.numero = params.numero;
    model.valor = params.valor;
    model.itens = params.itens.map(ItemModelTypeOrm.FromEntity);
    model.combos = params.combos.map(ComboModelTypeOrm.FromEntity);
    model.cliente = ClienteModelTypeOrm.FromEntity(params.cliente);
    model.status = params.status;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
