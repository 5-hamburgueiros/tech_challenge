import { ItemController } from '@/api/controllers/item.controller';
import { CreateItemUseCase } from '@/application/use-cases/item/create-item.use-case';
import { FindAllItensUseCase } from '@/application/use-cases/item/find-all-itens.use-case';
import { IIngredienteRepository, IItemRepository } from '@/domain/repository';
import { ICreateItem, IFindAllItens } from '@/domain/use-cases';
import {
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { IngredienteRepositoryTypeOrm } from '@/infra/repository/typeorm/ingrediente/ingrediente.repository';
import { ItemRepositoryTypeOrm } from '@/infra/repository/typeorm/item/item.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemModelTypeOrm, IngredienteModelTypeOrm]),
  ],
  controllers: [ItemController],
  providers: [
    { provide: IIngredienteRepository, useClass: IngredienteRepositoryTypeOrm },
    { provide: IItemRepository, useClass: ItemRepositoryTypeOrm },
    { provide: ICreateItem, useClass: CreateItemUseCase },
    { provide: IFindAllItens, useClass: FindAllItensUseCase },
  ],
})
export class ItemModule {}
