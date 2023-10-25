import { IngredienteEntity, ItemEntity } from '@/domain/entities';
import { IItemRepository } from '@/domain/repository';
import {
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';

export class CreateTypeOrmAdapter {
  public command(params: IItemRepository.Create.Params): ItemModelTypeOrm {
    const typeOrmEntity = new ItemModelTypeOrm();
    typeOrmEntity.id = params.item.id;
    typeOrmEntity.nome = params.item.nome;
    typeOrmEntity.categoria = params.item.categoria;
    typeOrmEntity.ingredientes = params.item.ingredientes.map(
      IngredienteModelTypeOrm.FromEntity,
    );
    typeOrmEntity.createdAt = params.item.createdAt;
    typeOrmEntity.updatedAt = params.item.updatedAt;
    return typeOrmEntity;
  }

  public result(params: ItemModelTypeOrm): ItemEntity {
    return new ItemEntity({
      id: params.id,
      nome: params.nome,
      categoria: params.categoria,
      valor: params.valor,
      ingredientes: params.ingredientes.map(IngredienteEntity.FromTypeOrmModel),
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }
}
