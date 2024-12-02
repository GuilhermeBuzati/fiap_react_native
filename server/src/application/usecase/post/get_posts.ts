import { PostDao, PostDaoModel } from "#application/dao/post_dao";

type Input = { query?: string; authorId?: string };

type Output = PostDaoModel[];

export class GetPosts {
  #postDao: PostDao;

  constructor(postDao: PostDao) {
    this.#postDao = postDao;
  }

  async handle(input: Input = {}): Promise<Output> {
    return await this.#postDao.getMany(input);
  }
}
