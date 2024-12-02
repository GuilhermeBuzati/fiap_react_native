import { AuthorDao, AuthorDaoModel } from "#application/dao/author_dao.ts";

type Output = AuthorDaoModel[];

export class GetAuthors {

  #authorDao: AuthorDao;

  constructor(authorDao: AuthorDao) {
    this.#authorDao = authorDao;
  }

  async handle(): Promise<Output> {
    return await this.#authorDao.getMany()
  }
}