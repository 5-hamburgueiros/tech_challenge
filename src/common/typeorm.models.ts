import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
  PagamentoModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PedidoModelTypeOrm,
  StatusModelTypeOrm,
} from '@/infra/database/typerom/model';

export const typeOrmEntities = [
  ClienteModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
  ComboModelTypeOrm,
  PedidoModelTypeOrm,
  StatusModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PagamentoModelTypeOrm
];
