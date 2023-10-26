import { ComboEntity, IngredienteEntity, ItemEntity } from '@/domain/entities';
import { IComboRepository } from '@/domain/repository';
import {
  ComboModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';

export class CreateTypeOrmAdapter {
  public command(params: IComboRepository.Create.Params): ComboModelTypeOrm {
    const typeOrmEntity = new ComboModelTypeOrm();
    typeOrmEntity.id = params.combo.id;
    typeOrmEntity.nome = params.combo.nome;
    typeOrmEntity.ativo = params.combo.ativo;
    typeOrmEntity.itens = params.combo.itens.map(ItemModelTypeOrm.FromEntity);
    typeOrmEntity.valor = params.combo.valor;
    typeOrmEntity.criadoEm = params.combo.criadoEm;
    typeOrmEntity.atualizadoEm = params.combo.atualizadoEm;
    return typeOrmEntity;
  }

  public result(params: ComboModelTypeOrm): ComboEntity {
    return new ComboEntity({
      id: params.id,
      nome: params.nome,
      valor: params.valor,
      ativo: params.ativo,
      itens: params.itens.map(
        (item) =>
          new ItemEntity({
            ...item,
            ingredientes: item.ingredientes.map(
              IngredienteEntity.FromTypeOrmModel,
            ),
          }),
      ),
      criadoEm: params.criadoEm,
      atualizadoEm: params.atualizadoEm,
    });
  }
}
