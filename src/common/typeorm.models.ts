import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';

export const typeOrmEntities = [
  ClienteModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
  ComboModelTypeOrm,
];
