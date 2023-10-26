import { ComboEntity } from '@/domain/entities';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemModelTypeOrm } from './';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Combo' })
@Index(['id'])
export class ComboModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Index({ fulltext: true })
  @Column({ name: 'Nome' })
  nome: string;

  @Column({ name: 'Valor', type: 'float' })
  valor: number;

  @Index({ fulltext: true })
  @Column({ name: 'Ativo' })
  ativo: boolean;

  @ManyToMany(() => ItemModelTypeOrm)
  @JoinTable({ name: 'Combo_Item' })
  public itens: ItemModelTypeOrm[];

  static FromEntity(params: ComboEntity): ComboModelTypeOrm {
    const model = new ComboModelTypeOrm();
    model.id = params.id;
    model.nome = params.nome;
    model.valor = params.valor;
    model.ativo = params.ativo;
    model.itens = params.itens.map(ItemModelTypeOrm.FromEntity);
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
