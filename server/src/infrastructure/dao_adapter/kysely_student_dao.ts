import { AuthorDao, AuthorDaoModel } from "#application/dao/author_dao.ts";
import { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import { StudentDao } from "#application/dao/student_dao.ts";
import { Student } from "#domain/model/student.ts";
import { undefined } from "valibot";

export class KyselyStudentDao implements StudentDao {
  #db: KyselyDatabase;

  constructor(db: KyselyDatabase) {
    this.#db = db;
  }

  async getMany(): Promise<AuthorDaoModel[]> {
    return await this.#db.selectFrom("student").select(["id", "username", "email"]).execute();
  }

  async getById(id: string): Promise<Student | null> {
    return await this.#db.selectFrom("student")
      .select(["id", "username", "email"])
      .where("id", "=", id)
      .executeTakeFirst() ?? null;
  }
}