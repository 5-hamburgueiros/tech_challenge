import { StatusPedido } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class pagamentoPedidoDto {
  @ApiProperty({
    description: 'Status do pedido',
    example: 'Em preparação',
  })
  @IsOptional()
  @IsString()
  status: StatusPedido;
}
