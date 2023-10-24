import { AmountTypeOrm } from '@/infra/database/typerom/model/value-objects';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../enum';

export class Amount {
  @ApiProperty({ description: 'Valor', example: 243.53 })
  public readonly value: number;

  @ApiProperty({ enum: Currency, description: 'Moeda', example: Currency.BRL })
  public readonly currency: Currency;

  constructor(value: number, currency: Currency) {
    this.value = value || 0;
    this.currency = currency || Currency.BRL;
  }

  static FromAmountTypeOrm(params: AmountTypeOrm): Amount {
    return new Amount(params.value, params.currency);
  }
}
