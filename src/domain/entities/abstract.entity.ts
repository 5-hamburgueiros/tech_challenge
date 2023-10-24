import { IdGenerator } from '@/common';

export abstract class AbstractEntity {
  public readonly id: string;
  public readonly createdAt: string;
  public updatedAt: string;

  constructor(id: string, createdAt?: string, updatedAt?: string) {
    this.id = id ? id : IdGenerator.Generate();
    const currentDate = new Date();
    this.createdAt = createdAt || currentDate.toISOString();
    this.setUpdatedAt(updatedAt);
  }

  public setUpdatedAt(updatedAt?: string): void {
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}
