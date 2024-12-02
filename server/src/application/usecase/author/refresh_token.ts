import type { JwtService } from "#application/jwt_service";
import type { AuthorRepo } from "#application/repo/author_repo.ts";
import { GetAuthorError } from "./get_author.ts";

type Input = {
  refreshToken: string;
};

type Output = {
  token: string;
  refreshToken: string;
};

export class RefreshToken {
  #authorRepo: AuthorRepo;
  #jwtToken: JwtService;

  constructor(authorRepo: AuthorRepo, jwtToken: JwtService) {
    this.#authorRepo = authorRepo;
    this.#jwtToken = jwtToken;
  }

  async handle(input: Input): Promise<Output> {
    const authorId = await this.#jwtToken.verifyRefresh(input.refreshToken);
    const author = await this.#authorRepo.getById(authorId);
    if (author === null) {
      throw new GetAuthorError();
    }

    const { accessToken, refreshToken } = await this.#jwtToken.sign(author);
    return { token: accessToken, refreshToken };
  }
}
