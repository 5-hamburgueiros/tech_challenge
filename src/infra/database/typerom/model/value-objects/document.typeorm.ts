import { DocumentType } from '@/domain/enum';
import { Document } from '@/domain/value-object';
import { Column } from 'typeorm';

export class DocumentTypeOrm {
  @Column({ name: 'Type', enum: DocumentType, default: DocumentType.CPF })
  readonly type: DocumentType;

  @Column({ name: 'Value' })
  readonly value: string;

  constructor(type: DocumentType, value: string) {
    this.type = type;
    this.value = value;
  }

  static FromDocumentype(params: Document): DocumentTypeOrm {
    return new DocumentTypeOrm(params.type, params.value);
  }
}
