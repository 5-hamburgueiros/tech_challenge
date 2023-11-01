import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface IComboService {
  paginate<T>(options: IPaginationOptions, query: any): Promise<Pagination<T>>;
}

export const IComboService = Symbol('IComboService');
