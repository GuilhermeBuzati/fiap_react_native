import type { UserRole } from "#domain/model/user_role.ts";

export interface AuthorDao {
  getMany(options?: GetManyDaoOptions): Promise<AuthorDaoModel[]>;
}

export type GetManyDaoOptions = {
  role?: UserRole;
}

export type AuthorDaoModel = {
  id: string;
  username: string;
  email: string;
}