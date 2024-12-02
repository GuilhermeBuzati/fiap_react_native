import { AuthorRepo } from "#application/repo/author_repo.ts";
import { GetAuthorError } from "#application/usecase/author/get_author.ts";

type Input = {
  id: string;
  newUsername?: string;
  newEmail?: string;
}

type Output = {
  id: string;
  username: string;
  email: string;
}

export class UpdateAuthor {
  
  #authorRepo: AuthorRepo;
  
  constructor(authorRepo: AuthorRepo) {
    this.#authorRepo = authorRepo;
  }
  
  async handle(input: Input): Promise<Output> {
    const author = await this.#authorRepo.getById(input.id);
    if (author === null) {
      throw new GetAuthorError();
    }
    
    let changed = false;
    if (input.newUsername) {
      author.username = input.newUsername;
      changed = true;
    } 
    
    if (input.newEmail) {
      author.email = input.newEmail;
      changed = true;
    }
    
    if (changed) {
      await this.#authorRepo.update(author);
    }
    
    return {
      id: author.id,
      username: author.username,
      email: author.email,
    }
  }
}