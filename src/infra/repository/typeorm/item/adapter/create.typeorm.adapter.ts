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
    typeOrmEntity.valor = params.item.valor;
    typeOrmEntity.ingredientes = params.item.ingredientes.map(
      IngredienteModelTypeOrm.FromEntity,
    );
    typeOrmEntity.criadoEm = params.item.criadoEm;
    typeOrmEntity.atualizadoEm = params.item.atualizadoEm;
    return typeOrmEntity;
  }

  public result(params: ItemModelTypeOrm): ItemEntity {
    return new ItemEntity({
      id: params.id,
      nome: params.nome,
      categoria: params.categoria,
      valor: params.valor,
      ingredientes: params.ingredientes.map(IngredienteEntity.FromTypeOrmModel),
      criadoEm: params.criadoEm,
      atualizadoEm: params.atualizadoEm,
    });
  }
}
