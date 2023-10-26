import { StatusEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Status' })
@Index(['id'])
export class StatusModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Nome' })
  nome: StatusPedido;

  static FromEntity(params: StatusEntity): StatusModelTypeOrm {
    const model = new StatusModelTypeOrm();
    model.id = params.id;
    model.nome = params.nome;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
