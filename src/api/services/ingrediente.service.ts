import { IIngredienteService } from '@/domain/service';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class IngredienteService implements IIngredienteService {
  constructor(
    @InjectRepository(IngredienteModelTypeOrm)
    private readonly repository: Repository<IngredienteModelTypeOrm>,
  ) {}

  async paginate<IngredienteModelTypeOrm>(
    options: IPaginationOptions,
    query: {
      nome?: string;
    },
  ): Promise<Pagination<IngredienteModelTypeOrm>> {
    const queryBuilder = this.repository.createQueryBuilder('ingrediente');
    queryBuilder.orderBy('ingrediente.criadoEm', 'DESC');
    if (query.nome) {
      queryBuilder
        .andWhere('ingrediente.nome ilike :nome', {
          nome: `%${query.nome}%`,
        })
        .getMany();
    }

    return paginate<IngredienteModelTypeOrm>(queryBuilder as any, options);
  }
}
