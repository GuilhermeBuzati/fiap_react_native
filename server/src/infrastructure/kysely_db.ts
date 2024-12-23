import { Kysely } from "kysely";

export type KyselyDatabase = Kysely<Db>;

type Db = {
  author: AuthorTable;
  post: PostTable;
  student: StudentTable;
};

type PostTable = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  author_id: string;
};

type AuthorTable = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
};

type StudentTable = {
  id: string;
  username: string;
  email: string;
};
