import { Author, AuthorAuth } from "#domain/model/author.ts";

export interface AuthorRepo {
  create(author: AuthorAuth): Promise<void>;
  getByEmail(email: string): Promise<AuthorAuth | null>;
  getById(id: string): Promise<AuthorAuth | null>;
  update(author: Author): Promise<void>;
  delete(id: string): Promise<void>;
}
