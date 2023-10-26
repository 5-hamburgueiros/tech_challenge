import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class IngredienteRepositoryTypeOrm implements IIngredienteRepository {
  constructor(
    @InjectRepository(IngredienteModelTypeOrm)
    private readonly ingredienteRepository: Repository<IngredienteModelTypeOrm>,
  ) {}
  async findAll(
    params: IIngredienteRepository.FindAll.Params,
  ): Promise<IIngredienteRepository.FindAll.Result> {
    const { nome, ids } = params;
    const where = {};

    if (nome) {
      Object.assign(where, {
        nome: ILike(`%${nome}%`),
      });
    }
    if (ids?.length) {
      Object.assign(where, {
        id: In(ids),
      });
    }
    const result = await this.ingredienteRepository.findBy(where);
    return result.map(IngredienteEntity.FromTypeOrmModel);
  }

  async create(
    params: IIngredienteRepository.Create.Params,
  ): Promise<IngredienteEntity> {
    return this.ingredienteRepository.save(params.ingrediente);
  }
}
