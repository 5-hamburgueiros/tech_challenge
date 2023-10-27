import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
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
];
