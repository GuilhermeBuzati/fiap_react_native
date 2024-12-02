import type { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import type { RepoFactory } from "#application/repo/_factory.ts";
import type { AuthorRepo, PostRepo, StudentRepo } from "#application/repo/mod.ts";

import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { KyselyAuthorRepo } from "./kysely_author_repository.ts";
import { KyselyPostRepo } from "./kisely_post_repository.ts";
import { KyselyStudentRepo } from "#infrastructure/repo_adapter/kysely_student_repository.ts";

export class KyselyRepoFactory implements RepoFactory {
  connection: KyselyDatabase;
  student: StudentRepo;
  author: AuthorRepo;
  post: PostRepo;

  constructor(connectionString: string) {
    const dialect = new PostgresDialect({
      pool: new pg.Pool({ connectionString: connectionString })
    });

    this.connection = new Kysely({ dialect });
    this.author = new KyselyAuthorRepo(this.connection);
    this.post = new KyselyPostRepo(this.connection);
    this.student = new KyselyStudentRepo(this.connection);
  }
}
