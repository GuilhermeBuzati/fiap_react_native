import type { DaoFactory } from "#application/dao/_factory.ts";
import type { JwtService } from "#application/jwt_service.ts";
import type { RepoFactory } from "#application/repo/_factory.ts";
import { CreateAuthor } from "#application/usecase/author/create_author.ts";
import { GetUser } from "#application/usecase/author/get_author.ts";
import { RefreshToken } from "#application/usecase/author/refresh_token.ts";
import { CreatePost } from "#application/usecase/post/create_post.ts";
import { DeletePost } from "#application/usecase/post/delete_post.ts";
import { GetPostById } from "#application/usecase/post/get_post_by_id.ts";
import { GetPosts } from "#application/usecase/post/get_posts.ts";
import { UpdatePost } from "#application/usecase/post/update_post.ts";
import { UpdateAuthor } from "#application/usecase/author/update_author.ts";
import { RemoveAuthor } from "#application/usecase/author/remove_author.ts";
import { GetAuthors } from "#application/usecase/author/get_authors.ts";
import { CreateStudent } from "#application/usecase/student/create_student.ts";
import { UpdateStudent } from "#application/usecase/student/update_student.ts";
import { RemoveStudent } from "#application/usecase/student/remove_student.ts";
import { GetStudents } from "#application/usecase/student/get_students.ts";
import { GetStudentById } from "#application/usecase/student/get_student.ts";

type Constructor<T = any> = new (...args: any[]) => T;

export type Uc = <T>(classUseCase: Constructor<T>) => T

export function registerContainer(container: Record<string, Function>): Uc {
  return (classUseCase) => {
    const func = container[classUseCase.name] ?? null;
    if (func === null) {
      throw new Error("Use case not registered!");
    }

    return func();
  };
}

export function createContainer(repoFactory: RepoFactory, daoFactory: DaoFactory, jwtService: JwtService) {
  const postRepo = repoFactory.post;
  const authorRepo = repoFactory.author;
  const studentRepo = repoFactory.student;
  const authorDao = daoFactory.author;
  const postDao = daoFactory.post;
  const studentDao = daoFactory.student;

  return {
    [CreateAuthor.name]: () => new CreateAuthor(authorRepo, jwtService),
    [GetUser.name]: () => new GetUser(authorRepo, jwtService),
    [RefreshToken.name]: () => new RefreshToken(authorRepo, jwtService),
    [UpdateAuthor.name]: () => new UpdateAuthor(authorRepo),
    [RemoveAuthor.name]: () => new RemoveAuthor(authorRepo),
    [GetAuthors.name]: () => new GetAuthors(authorDao),
    [CreatePost.name]: () => new CreatePost(postRepo),
    [DeletePost.name]: () => new DeletePost(postRepo),
    [GetPostById.name]: () => new GetPostById(postDao),
    [GetPosts.name]: () => new GetPosts(postDao),
    [UpdatePost.name]: () => new UpdatePost(postRepo),
    [CreateStudent.name]: () => new CreateStudent(studentRepo),
    [UpdateStudent.name]: () => new UpdateStudent(studentRepo),
    [RemoveStudent.name]: () => new RemoveStudent(studentRepo),
    [GetStudents.name]: () => new GetStudents(studentDao),
    [GetStudentById.name]: () => new GetStudentById(studentDao),
  };
}