import { ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredienteModelTypeOrm } from './';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Item' })
@Index(['id'])
export class ItemModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Index({ fulltext: true })
  @Column({ name: 'Nome' })
  nome: string;

  @Column({ name: 'Valor', type: 'float' })
  valor: number;

  @Index({ fulltext: true })
  @Column({ name: 'Categoria' })
  categoria: CategoriaItem;

  @ManyToMany(() => IngredienteModelTypeOrm)
  @JoinTable({ name: 'Item_Ingrediente' })
  public ingredientes: IngredienteModelTypeOrm[];

  static FromEntity(params: ItemEntity): ItemModelTypeOrm {
    const model = new ItemModelTypeOrm();
    model.id = params.id;
    model.nome = params.nome;
    model.categoria = params.categoria;
    model.ingredientes = params.ingredientes.map(
      IngredienteModelTypeOrm.FromEntity,
    );
    model.valor = params.valor;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
