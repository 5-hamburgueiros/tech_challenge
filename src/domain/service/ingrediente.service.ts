import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface IIngredienteService {
  paginate<T>(options: IPaginationOptions, query: any): Promise<Pagination<T>>;
}

export const IIngredienteService = Symbol('IIngredienteService');
