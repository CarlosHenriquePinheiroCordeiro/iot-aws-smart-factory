import { IDomain } from './domain.interface';

export interface IRepository {
  findById(id: string): Promise<IDomain | null>;
  save(user: IDomain): Promise<void>;
}
