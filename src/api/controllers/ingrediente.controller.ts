import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteService } from '@/domain/service';
import { ICreateIngrediente, IFindAllIngredientes } from '@/domain/use-cases';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
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
import { ApiOkResponsePaginated, CreateIgredienteDto } from '../dtos';
import { AllowAnonymous } from '../middlewares/auth-guard.strategy';

@ApiTags('Ingredientes')
@Controller('ingredientes')
export class IngredienteController {
  constructor(
    @Inject(ICreateIngrediente)
    private readonly createIngrediente: ICreateIngrediente,
    @Inject(IFindAllIngredientes)
    private readonly findAll: IFindAllIngredientes,
    @Inject(IIngredienteService)
    private readonly _ingredienteService: IIngredienteService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateIgredienteDto) {
    return this.createIngrediente.execute(dto);
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
  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @Get()
  @ApiResponse({ type: Pagination<IngredienteModelTypeOrm> })
  @ApiOkResponsePaginated(IngredienteEntity)
  async index(
    @Query('nome') nome: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<IngredienteModelTypeOrm>> {
    limit = limit > 100 ? 100 : limit;
    return this._ingredienteService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3333/ingredientes',
      },
      {
        nome,
      },
    );
  }
}
