import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class IngredienteRepositoryTypeOrm implements IIngredienteRepository {
  constructor(
    @InjectRepository(IngredienteModelTypeOrm)
    private readonly ingredienteRepository: Repository<IngredienteModelTypeOrm>,
  ) {}
  async findAll(
    params: IIngredienteRepository.FindAll.Params,
  ): Promise<IIngredienteRepository.FindAll.Result> {
    const { nome } = params;

    if (nome) {
      const result = await this.ingredienteRepository.find({
        where: {
          nome: ILike(`%${nome}%`),
        },
      });
      return result.map(IngredienteEntity.FromTypeOrmModel);
    }
    const result = await this.ingredienteRepository.find();
    return result.map(IngredienteEntity.FromTypeOrmModel);
  }

  async create(
    params: IIngredienteRepository.Create.Params,
  ): Promise<IngredienteEntity> {
    return this.ingredienteRepository.save(params.ingrediente);
  }
}
