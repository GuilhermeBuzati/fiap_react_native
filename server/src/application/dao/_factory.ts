import { PostDao } from "./post_dao.ts";
import { AuthorDao } from "./author_dao.ts";
import { StudentDao } from "./student_dao.ts";

export interface DaoFactory {
  post: PostDao;
  author: AuthorDao;
  student: StudentDao;
}
