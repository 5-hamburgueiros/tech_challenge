import { CategoriaItem } from '@/domain/enum';
import {
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngredienteModelTypeOrm,
      ItemModelTypeOrm,
      ComboModelTypeOrm,
    ]),
  ],
})
export class SeedModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const ingredientes = await this.ingredienteSeed();
    const itens = await this.itensSeed(Object.values(ingredientes));
    await this.comboSeed(Object.values(itens));
    Logger.log(`Seed finalizado`, SeedModule.name);
  }
  async ingredienteSeed() {
    const alface = new IngredienteModelTypeOrm();
    alface.calorias = 0;
    alface.nome = 'Alface';
    alface.valor = 0.4;
    alface.custo = 0.1;
    await alface.save();

    const bacon = new IngredienteModelTypeOrm();
    bacon.calorias = 100;
    bacon.nome = 'Bacon';
    bacon.custo = 2;
    bacon.valor = 5;
    await bacon.save();

    const hamburguer = new IngredienteModelTypeOrm();
    hamburguer.calorias = 200;
    hamburguer.nome = 'Hamburguer de Carne';
    hamburguer.custo = 3;
    hamburguer.valor = 10;
    await hamburguer.save();

    const ovo = new IngredienteModelTypeOrm();
    ovo.calorias = 80;
    ovo.nome = 'Ovo';
    ovo.custo = 0.8;
    ovo.valor = 2;
    await ovo.save();

    const queijo = new IngredienteModelTypeOrm();
    queijo.calorias = 90;
    queijo.nome = 'Queijo';
    queijo.custo = 1.5;
    queijo.valor = 3;
    await queijo.save();

    const pao = new IngredienteModelTypeOrm();
    pao.calorias = 100;
    pao.nome = 'Pão com gergelim';
    pao.custo = 1;
    pao.valor = 2;
    await pao.save();

    return {
      alface,
      bacon,
      hamburguer,
      ovo,
      queijo,
      pao,
    };
  }

  async itensSeed(ingredientes: IngredienteModelTypeOrm[]) {
    const xBacon = new ItemModelTypeOrm();
    xBacon.nome = 'X-Bacon';
    xBacon.valor = 29.9;
    xBacon.ingredientes = ingredientes;
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
  }

  async comboSeed(itens: ItemModelTypeOrm[]) {
    const combo = new ComboModelTypeOrm();
    combo.nome = 'X-Bacon + Coca-Cola + Batata Frita';
    combo.valor = 39.9;
    combo.ativo = true;
    combo.itens = itens;
    await combo.save();
  }
}
