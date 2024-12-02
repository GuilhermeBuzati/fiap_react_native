import { AuthorRepo } from "#application/repo/author_repo.ts";
import { GetAuthorError } from "#application/usecase/author/get_author.ts";

type Input = {
  id: string;
};

export class RemoveAuthor {
  #authorRepo: AuthorRepo;

  constructor(authorRepo: AuthorRepo) {
    this.#authorRepo = authorRepo;
  }

  async handle(input: Input): Promise<void> {
    const author = await this.#authorRepo.getById(input.id);
    if (author === null) {
      throw new GetAuthorError();
    }

    await this.#authorRepo.delete(author.id);
  }
}
