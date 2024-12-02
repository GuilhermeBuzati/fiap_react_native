export interface PostDao {
  getMany(options?: GetManyDaoOptions): Promise<PostDaoModel[]>;
  getById(id: string): Promise<PostDaoModel | null>;
}

export type PostDaoModel = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: { id: string; name: string };
};

export type GetManyDaoOptions = { query?: string; userId?: string };
