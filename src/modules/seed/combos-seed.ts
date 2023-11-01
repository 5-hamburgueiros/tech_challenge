import {
  ComboModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';

export default async (itens: Record<string, ItemModelTypeOrm>) => {
  const combo = new ComboModelTypeOrm();
  combo.nome = 'X-Bacon + Coca-Cola + Batata Frita';
  combo.valor = 39.9;
  combo.ativo = true;
  combo.itens = [itens.xBacon, itens.cocaCola, itens.bataFrita];
  await combo.save();
};
