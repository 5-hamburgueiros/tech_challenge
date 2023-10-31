import { IngredienteEntity } from '@/domain/entities';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Ingrediente' })
@Index(['id'])
export class IngredienteModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Index({ fulltext: true })
  @Column({ name: 'Nome' })
  nome: string;

  @Column({ name: 'Quantidade', type: 'float', nullable: true })
  quantidade: number;

  @Column({ name: 'Calorias', type: 'float' })
  calorias: number;

  @Column({ name: 'Valor', type: 'float' })
  valor: number;

  @Column({ name: 'Custo', type: 'float' })
  custo: number;

  static FromEntity(params: IngredienteEntity): IngredienteModelTypeOrm {
    const model = new IngredienteModelTypeOrm();
    model.id = params.id;
    model.nome = params.nome;
    model.calorias = params.calorias;
    model.custo = params.custo;
    model.quantidade = params.quantidade;
    model.valor = params.valor;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
