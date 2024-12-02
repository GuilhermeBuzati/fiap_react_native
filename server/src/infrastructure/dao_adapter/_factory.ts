import type { DaoFactory } from "#application/dao/_factory.ts";
import type { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import { KyselyPostDao } from "./kysely_post_dao.ts";
import { KyselyAuthorDao } from "#infrastructure/dao_adapter/kysely_author_dao.ts";
import { AuthorDao } from "#application/dao/author_dao.ts";
import { PostDao } from "#application/dao/post_dao.ts";
import { StudentDao } from "#application/dao/student_dao.ts";
import { KyselyStudentDao } from "#infrastructure/dao_adapter/kysely_student_dao.ts";

export class KyselyDaoFactory implements DaoFactory {
  post: PostDao;
  author: AuthorDao;
  student: StudentDao;
  
  constructor(db: KyselyDatabase) {
    this.post = new KyselyPostDao(db);
    this.author = new KyselyAuthorDao(db);
    this.student = new KyselyStudentDao(db);
  }
}
