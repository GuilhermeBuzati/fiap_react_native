import type { PostRepo, AuthorRepo, StudentRepo } from "#application/repo/mod.ts";

export interface RepoFactory {
  author: AuthorRepo;
  post: PostRepo;
  student: StudentRepo;
}
