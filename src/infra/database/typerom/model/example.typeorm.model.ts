import { ExampleEntity } from '@/domain/entities';
import { BadRequestException } from '@nestjs/common';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Example' })
@Index(['id'])
export class ExampleModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'IsActive', default: true })
  isActive: boolean;

  public active(): void {
    if (this.isActive) {
      throw new BadRequestException({}, 'It is already active');
    }
    this.isActive = true;
  }

  static FromEntity(params: ExampleEntity): ExampleModelTypeOrm {
    const model = new ExampleModelTypeOrm();
    model.id = params.id;
    model.name = params.name;
    model.email = params.email;
    model.isActive = params.active;
    model.createdAt = params.createdAt;
    model.updatedAt = params.updatedAt;
    return model;
  }
}
