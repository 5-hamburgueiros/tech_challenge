import { IngredienteEntity, ItemEntity } from '@/domain/entities';
import { ItemModelTypeOrm } from '@/infra/database/typerom/model';

export class FindAllItensTypeOrmAdapter {
  public result(params: ItemModelTypeOrm[]): ItemEntity[] {
    return params.map(
      (item) =>
        new ItemEntity({
          id: item.id,
          nome: item.nome,
          categoria: item.categoria,
          valor: item.valor,
          ingredientes: item.ingredientes.map(
            IngredienteEntity.FromTypeOrmModel,
          ),
          criadoEm: item.criadoEm,
          atualizadoEm: item.atualizadoEm,
        }),
    );
  }
}
