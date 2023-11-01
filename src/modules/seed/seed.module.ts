import {
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import comboSeed from './combos-seed';
import ingredientesSeed from './ingredientes-seed';
import itensSeed from './itens-seed';
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
    Logger.log(`Iniciando Seed`, SeedModule.name);
    const [, mustSeed] = await IngredienteModelTypeOrm.findAndCount();
    if (mustSeed) {
      Logger.log(`Seed já realizado`, SeedModule.name);
      return;
    }
    const ingredientes = await ingredientesSeed();
    const itens = await itensSeed(ingredientes);
    await comboSeed(itens);
    Logger.log(`Seed finalizado`, SeedModule.name);
  }
}
