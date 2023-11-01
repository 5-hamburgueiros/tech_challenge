import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface IItemService {
  paginate<T>(options: IPaginationOptions, query: any): Promise<Pagination<T>>;
}

export const IItemService = Symbol('IItemService');
