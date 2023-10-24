import { ICreateExample } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExampleDto } from '../dtos';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(
    @Inject(ICreateExample)
    private readonly createExampleUseCase: ICreateExample,
  ) {}
  @Get()
  get(): string {
    return 'Hello World!';
  }
  @Post()
  async create(@Body() dto: CreateExampleDto) {
    return this.createExampleUseCase.execute(dto);
  }
}
