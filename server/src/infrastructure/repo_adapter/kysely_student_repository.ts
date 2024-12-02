import type { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import { StudentRepo } from "#application/repo/student_repo.ts";
import { Student } from "#domain/model/student.ts";

export class KyselyStudentRepo implements StudentRepo {
  #db: KyselyDatabase;

  constructor(db: KyselyDatabase) {
    this.#db = db;
  }

  async getById(id: string): Promise<Student | null> {
    const raw =
      (await this.#db
        .selectFrom("student")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst()) ?? null;

    if (raw === null) {
      return null;
    }

    return new Student(raw.id, raw.email, raw.username);
  }

  async create(student: Student): Promise<void> {
    await this.#db
      .insertInto("student")
      .values({
        id: student.id,
        email: student.email,
        username: student.username,
      })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.#db.deleteFrom("student")
      .where("id", "=", id)
      .execute();
  }

  async update(student: Student): Promise<void> {
    await this.#db
      .updateTable("student")
      .set({
        email: student.email,
        username: student.username
      })
      .where("id", "=", student.id)
      .execute();
  }
}
