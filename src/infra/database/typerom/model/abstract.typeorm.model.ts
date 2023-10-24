import {
  BaseEntity as BaseModel,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractModel extends BaseModel {
  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: string;
}
