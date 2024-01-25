import { IdGenerator } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FakeCheckoutDto {
  @ApiProperty({
    description: 'Id do pedido',
    required: true,
    example: [IdGenerator.Generate()],
  })
  @IsString()
  id: string;
}
