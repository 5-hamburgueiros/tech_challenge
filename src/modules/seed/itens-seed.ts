import { CategoriaItem } from '@/domain/enum';
import {
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Logger } from '@nestjs/common';

export default async (
  ingredientes: Record<string, IngredienteModelTypeOrm>,
) => {
  const [, mustSeed] = await ItemModelTypeOrm.findAndCount();
  if (mustSeed) {
    Logger.log(`Seed já realizado`, 'ItensSeed');
    return;
  }
  const xBacon = new ItemModelTypeOrm();
  xBacon.nome = 'X-Bacon';
  xBacon.valor = 29.9;
  xBacon.ingredientes = [
    ingredientes.bacon,
    ingredientes.hamburguer,
    ingredientes.queijo,
    ingredientes.pao,
  ];
  xBacon.categoria = CategoriaItem.Lanche;
  await xBacon.save();

  const cocaCola = new ItemModelTypeOrm();
  cocaCola.nome = 'Coca-Cola';
  cocaCola.valor = 4.9;
  cocaCola.categoria = CategoriaItem.Bebida;
  await cocaCola.save();

  const bataFrita = new ItemModelTypeOrm();
  bataFrita.nome = 'Batata Frita';
  bataFrita.valor = 5.9;
  bataFrita.categoria = CategoriaItem.Acompanhamento;
  await bataFrita.save();

  return {
    xBacon,
    cocaCola,
    bataFrita,
  };
};
