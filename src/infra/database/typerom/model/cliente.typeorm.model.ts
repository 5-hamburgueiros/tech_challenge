import { ClienteEntity } from '@/domain/entities';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Cliente' })
@Index(['id'])
export class ClienteModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Nome' })
  nome: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Documento', unique: true })
  documento: string;

  static FromEntity(params: ClienteEntity): ClienteModelTypeOrm {
    const model = new ClienteModelTypeOrm();
    model.id = params.id;
    model.nome = params.nome;
    model.email = params.email;
    model.documento = params.documento;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
