import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import {
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { PedidoModelTypeOrm } from './pedido.typeorm.model';
import { StatusModelTypeOrm } from './status.typeorm.model';

@Entity({ name: 'Historico' })
@Index(['id'])
export class PedidoHistoricoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @ManyToOne(() => PedidoModelTypeOrm, { nullable: true })
  @JoinTable()
  pedido: PedidoModelTypeOrm;

  @ManyToOne(() => StatusModelTypeOrm, { nullable: true })
  @JoinTable()
  status: StatusModelTypeOrm;

  static FromEntity(
    params: PedidoHistoricoEntity,
  ): PedidoHistoricoModelTypeOrm {
    const model = new PedidoHistoricoModelTypeOrm();
    model.id = params.id;
    model.pedido = params.pedido;
    model.status = params.status;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
