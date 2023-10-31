import {
  ComboModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Logger } from '@nestjs/common';

export default async (itens: Record<string, ItemModelTypeOrm>) => {
  const [, mustSeed] = await ComboModelTypeOrm.findAndCount();
  if (mustSeed) {
    Logger.log(`Seed já realizado`, 'ComboSeed');
    return;
  }
  const combo = new ComboModelTypeOrm();
  combo.nome = 'X-Bacon + Coca-Cola + Batata Frita';
  combo.valor = 39.9;
  combo.ativo = true;
  combo.itens = [itens.xBacon, itens.cocaCola, itens.bataFrita];
  await combo.save();
};
