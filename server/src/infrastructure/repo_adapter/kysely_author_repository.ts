import type { AuthorRepo } from "#application/repo/author_repo.ts";
import type { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import { Author, AuthorAuth } from "#domain/model/author.ts";

export class KyselyAuthorRepo implements AuthorRepo {
  #db: KyselyDatabase;

  constructor(db: KyselyDatabase) {
    this.#db = db;
  }

  async getById(id: string): Promise<AuthorAuth | null> {
    const raw =
      (await this.#db
        .selectFrom("author")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst()) ?? null;

    if (raw === null) {
      return null;
    }

    return new AuthorAuth(raw.id, raw.email, raw.username, raw.password_hash);
  }

  async getByEmail(email: string): Promise<AuthorAuth | null> {
    const raw =
      (await this.#db
        .selectFrom("author")
        .where("email", "=", email)
        .selectAll()
        .executeTakeFirst()) ?? null;

    if (raw === null) {
      return null;
    }

    return new AuthorAuth(raw.id, raw.email, raw.username, raw.password_hash);
  }

  async create(author: AuthorAuth): Promise<void> {
    await this.#db
      .insertInto("author")
      .values({
        id: author.id,
        email: author.email,
        username: author.username,
        password_hash: author.passwordHash
      })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.#db.deleteFrom("author")
      .where("id", "=", id)
      .execute();
  }

  async update(author: Author): Promise<void> {
    await this.#db
      .updateTable("author")
      .set({
        email: author.email,
        username: author.username
      })
      .where("id", "=", author.id)
      .execute();
  }
}
