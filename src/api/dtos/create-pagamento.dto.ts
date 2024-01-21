import { IdGenerator } from '@/common';
import { StatusPagamento } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @ApiProperty({
    description: 'QR Code de pagamento',
    example: '044fa9e3-165c-44bb-8ac3-6c8d578da353","qr_data":"00020101021243650016COM.MERCADOLIBRE020130636044fa9e3-165c-44bb-8ac3-6c8d578da3535204000053039865802BR5909Test Test6009SAO PAULO62070503***6304E000',
    required: true,
  })
  @IsString()
  qrData: string;

  @ApiProperty({
    description: 'Id externo do pagamento',
    required: false,
    example: [IdGenerator.Generate()],
  })
  @IsOptional()
  @IsString()
  idExterno: string;

  @ApiProperty({
    description: 'Status do pagamento',
    example: 'PAGO',
    enum: StatusPagamento,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusPagamento)
  @IsString()
  status: StatusPagamento;

  @ApiProperty({
    description: 'Pedido vinculado ao pagamento',
    required: true,
    example: [IdGenerator.Generate()],
  })
  @IsString()
  pedido: string;
}
