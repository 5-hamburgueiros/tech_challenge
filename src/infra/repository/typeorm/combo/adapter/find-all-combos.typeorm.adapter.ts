import { ComboEntity, IngredienteEntity, ItemEntity } from '@/domain/entities';
import { ComboModelTypeOrm } from '@/infra/database/typerom/model';

export class FindAllCombosTypeOrmAdapter {
  public result(params: ComboModelTypeOrm[]): ComboEntity[] {
    return params.map(
      (combo) =>
        new ComboEntity({
          id: combo.id,
          nome: combo.nome,
          ativo: combo.ativo,
          valor: combo.valor,
          itens: combo.itens.map((item) =>
            ItemEntity.FromTypeOrmModel({
              ...item,
              ingredientes: item.ingredientes.map(
                IngredienteEntity.FromTypeOrmModel,
              ),
            }),
          ),
          criadoEm: combo.criadoEm,
          atualizadoEm: combo.atualizadoEm,
        }),
    );
  }
}
