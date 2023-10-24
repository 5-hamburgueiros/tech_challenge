import { Currency } from '@/domain/enum';
import { Amount } from '@/domain/value-object';
import { Column } from 'typeorm';

export class AmountTypeOrm {
  @Column({ name: 'Currency', enum: Currency, default: Currency.BRL })
  currency: Currency;

  @Column({ name: 'Value', type: 'decimal', precision: 19, scale: 2 })
  value: number;

  constructor(currency: Currency, value: number) {
    this.currency = currency || Currency.BRL;
    this.value = value || 0;
  }

  static FromAmount(params: Amount): AmountTypeOrm {
    return new AmountTypeOrm(params?.currency, params?.value);
  }
}
