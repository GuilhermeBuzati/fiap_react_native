import { AuthorDao, AuthorDaoModel } from "#application/dao/author_dao.ts";
import { KyselyDatabase } from "#infrastructure/kysely_db.ts";

export class KyselyAuthorDao implements AuthorDao {
  #db: KyselyDatabase;

  constructor(db: KyselyDatabase) {
    this.#db = db;
  }

  getMany(): Promise<AuthorDaoModel[]> {
    return this.#db.selectFrom("author").select(["id", "username", "email"]).execute();
  }
}