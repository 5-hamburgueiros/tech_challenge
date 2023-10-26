import { IngredienteController } from '@/api/controllers/ingrediente.controller';
import { CreateIngrendienteUseCase } from '@/application/use-cases/ingrediente/create-ingrediente.use-case';
import { FindAllIngredientsUseCase } from '@/application/use-cases/ingrediente/find-all-ingredientes.use-case';
import { IIngredienteRepository } from '@/domain/repository';
import { ICreateIngrediente, IFindAllIngredientes } from '@/domain/use-cases';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
import { IngredienteRepositoryTypeOrm } from '@/infra/repository/typeorm/ingrediente/ingrediente.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IngredienteModelTypeOrm])],
  controllers: [IngredienteController],
  providers: [
    { provide: IIngredienteRepository, useClass: IngredienteRepositoryTypeOrm },
    { provide: ICreateIngrediente, useClass: CreateIngrendienteUseCase },
    { provide: IFindAllIngredientes, useClass: FindAllIngredientsUseCase },
  ],
})
export class IngredienteModule {}
