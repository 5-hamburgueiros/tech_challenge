import { ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';
import { IItemService } from '@/domain/service';
import { ICreateItem, IFindAllItens } from '@/domain/use-cases';
import { ItemModelTypeOrm } from '@/infra/database/typerom/model/item.typeorm.model';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOkResponsePaginated, CreateItemDto } from '../dtos';
import { AllowAnonymous } from '../middlewares/auth-guard.strategy';

@ApiTags('Itens')
@Controller('itens')
export class ItemController {
  constructor(
    @Inject(ICreateItem)
    private readonly createItem: ICreateItem,
    @Inject(IFindAllItens) private readonly findAll: IFindAllItens,
    @Inject(IItemService) private readonly _itemService: IItemService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiSecurity('bearer')
  async create(@Body() dto: CreateItemDto) {
    return this.createItem.execute({
      categoria: dto.categoria,
      nome: dto.nome,
      valor: dto.valor,
      ingredientes: dto.ingredientes,
    });
  }

  @ApiQuery({
    name: 'nome',
    required: false,
  })
  @ApiQuery({
    name: 'categoria',
    enum: CategoriaItem,
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
  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @Get()
  @ApiResponse({ type: Pagination<ItemModelTypeOrm> })
  @ApiOkResponsePaginated(ItemEntity)
  async list(
    @Query('nome') nome: string,
    @Query('categoria') categoria: CategoriaItem,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ItemModelTypeOrm>> {
    limit = limit > 100 ? 100 : limit;
    return this._itemService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3333/itens',
      },
      {
        categoria,
        nome,
      },
    );
  }
}
