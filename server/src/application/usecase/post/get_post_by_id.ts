import type { PostDao } from "#application/dao/post_dao.ts";

type Input = { id: string };

type Output = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: { id: string; name: string };
} | null;

export class GetPostById {
  #postDao: PostDao;

  constructor(postDao: PostDao) {
    this.#postDao = postDao;
  }

  async handle(input: Input): Promise<Output> {
    return await this.#postDao.getById(input.id);
  }
}
