import { IdGenerator } from '@/common';

export abstract class AbstractEntity {
  public readonly id: string;
  public readonly criadoEm: string;
  public atualizadoEm: string;

  constructor(id: string, criadoEm?: string, atualizadoEm?: string) {
    this.id = id ? id : IdGenerator.Generate();
    const currentDate = new Date();
    this.criadoEm = criadoEm || currentDate.toISOString();
    this.setAtualizadoEm(atualizadoEm);
  }

  public setAtualizadoEm(atualizadoEm?: string): void {
    this.atualizadoEm = atualizadoEm || new Date().toISOString();
  }
}
