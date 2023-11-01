import { ComboEntity } from '@/domain/entities';
import { IComboService } from '@/domain/service';
import { ICreateCombo, IFindAllCombos } from '@/domain/use-cases';
import { ComboModelTypeOrm } from '@/infra/database/typerom/model';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOkResponsePaginated, CreateComboDto } from '../dtos';

@ApiTags('Combos')
@Controller('combos')
export class ComboController {
  constructor(
    @Inject(ICreateCombo)
    private readonly createCombo: ICreateCombo,
    @Inject(IFindAllCombos) private readonly findAll: IFindAllCombos,
    @Inject(IComboService)
    private readonly _comboService: IComboService,
  ) {}

  @Post()
  async create(@Body() dto: CreateComboDto) {
    return this.createCombo.execute({
      ativo: true,
      nome: dto.nome,
      valor: dto.valor,
      itens: dto.itens,
    });
  }

  @ApiQuery({
    name: 'nome',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @Get()
  @ApiResponse({ type: Pagination<ComboModelTypeOrm> })
  @ApiOkResponsePaginated(ComboEntity)
  async list(
    @Query('nome') nome: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ComboModelTypeOrm>> {
    limit = limit > 100 ? 100 : limit;
    return this._comboService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3333/itens',
      },
      {
        nome,
      },
    );
  }
}
