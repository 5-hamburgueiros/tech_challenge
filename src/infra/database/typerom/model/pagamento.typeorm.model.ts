import { PagamentoEntity } from '@/domain/entities';
import { StatusPagamento } from '@/domain/enum';
import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PedidoModelTypeOrm } from '.';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Pagamento' })
@Index(['id'])
export class PagamentoModelTypeOrm extends AbstractModel {

  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'qrData' })
  qrData: string;

  @IsOptional()
  @Column({ name: 'idExterno', nullable: true})
  idExterno: string;

  @Column({ name: 'statusPagamento', default: StatusPagamento.AGUARDANDO_PAGAMENTO })
  status: StatusPagamento;

  @OneToOne(() => PedidoModelTypeOrm, (pedido) => pedido.pagamento)
  @JoinColumn()
  pedido: PedidoModelTypeOrm;

  static FromEntity(params: PagamentoEntity): PagamentoModelTypeOrm {
    const model = new PagamentoModelTypeOrm();
    model.id = params.id;
    model.qrData = params.qrData;
    model.idExterno = params.idExterno;
    model.status = params.status;
    model.pedido = PedidoModelTypeOrm.FromEntity(params.pedido);
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
