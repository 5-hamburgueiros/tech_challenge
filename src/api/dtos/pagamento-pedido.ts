import { StatusPedido } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Status do pedido',
    example: 'PAGO',
  })
  @IsOptional()
  @IsString()
  status: StatusPedido;
}
