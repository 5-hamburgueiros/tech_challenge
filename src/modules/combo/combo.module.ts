import { ComboController } from '@/api/controllers/combo.controller';
import { ComboService } from '@/api/services';
import {
  CreateComboUseCase,
  FindAllCombosUseCase,
} from '@/application/use-cases';
import { IComboRepository, IItemRepository } from '@/domain/repository';
import { IComboService } from '@/domain/service';
import { ICreateCombo, IFindAllCombos } from '@/domain/use-cases';
import {
  ComboModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { ItemRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { ComboRepositoryTypeOrm } from '@/infra/repository/typeorm/combo';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComboModelTypeOrm, ItemModelTypeOrm])],
  controllers: [ComboController],
  providers: [
    {
      provide: IItemRepository,
      useClass: ItemRepositoryTypeOrm,
    },
    {
      provide: IComboRepository,
      useClass: ComboRepositoryTypeOrm,
    },
    {
      provide: ICreateCombo,
      useClass: CreateComboUseCase,
    },
    {
      provide: IFindAllCombos,
      useClass: FindAllCombosUseCase,
    },
    { provide: IComboService, useClass: ComboService },
  ],
})
export class ComboModule {}
