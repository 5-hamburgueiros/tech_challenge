import { DocumentTypeOrm } from '@/infra/database/typerom/model/value-objects';
import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '../enum';

export class Document {
  @ApiProperty({
    enum: DocumentType,
    description: 'Tipo de documento do cliente',
    example: DocumentType.CPF,
  })
  public readonly type: DocumentType;

  @ApiProperty({
    description: 'Identificador do cliente',
    example: '67418735030',
  })
  public readonly value: string;

  constructor(type: DocumentType, value: string) {
    this.type = type;
    this.value = value;
  }

  static FromDocumentTypeOrm(params: DocumentTypeOrm): Document {
    return new Document(params.type, params.value);
  }
}
