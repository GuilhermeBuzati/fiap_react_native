import {
  GetManyDaoOptions,
  PostDao,
  PostDaoModel,
} from "#application/dao/post_dao";
import { KyselyDatabase } from "#infrastructure/kysely_db";

export class KyselyPostDao implements PostDao {
  #db: KyselyDatabase;

  constructor(db: KyselyDatabase) {
    this.#db = db;
  }

  async getMany(options: GetManyDaoOptions = {}): Promise<PostDaoModel[]> {
    let query = this.#db.selectFrom("post");

    if (options.userId) {
      query = query.where("post.author_id", "=", options.userId);
    }

    if (options.query) {
      const q = `%${options.query}%`;
      query = query.where((eb) =>
        eb.or([eb("title", "ilike", q), eb("content", "ilike", q)]),
      );
    }

    const items = await query
      .innerJoin("author", "author.id", "post.author_id")
      .orderBy("post.published_at desc")
      .select([
        "post.id as postId",
        "post.content as postContent",
        "post.published_at as postPublishedAt",
        "post.title as postTitle",
        "author.id as authorId",
        "author.username as authorName",
      ])
      .execute();

    return items.map((s) => ({
      id: s.postId,
      content: s.postContent,
      publishedAt: s.postPublishedAt,
      title: s.postTitle,
      author: { id: s.authorId, name: s.authorName },
    }));
  }

  async getById(id: string): Promise<PostDaoModel | null> {
    const data =
      (await this.#db
        .selectFrom("post")
        .where("post.id", "=", id)
        .innerJoin("author", "author.id", "post.author_id")
        .select([
          "post.id as postId",
          "title",
          "content",
          "published_at",
          "author.id as authorId",
          "author.username as authorName",
        ])
        .executeTakeFirst()) ?? null;

    if (data === null) {
      return null;
    }

    return {
      id: data.postId,
      author: { id: data.authorId, name: data.authorName },
      content: data.content,
      publishedAt: data.published_at,
      title: data.title,
    };
  }
}
