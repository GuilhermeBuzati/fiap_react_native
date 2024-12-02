import type { AuthorRepo } from "#application/repo/author_repo.ts";
import type { JwtService } from "#application/jwt_service.ts";
import type { UserRole } from "#domain/model/user_role.ts";
import { AuthorAuth } from "#domain/model/author.ts";

type Input = {
  email: string;
  username: string;
  password: string;
};

type Output = {
  id: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
};

export class CreateAuthor {
  #userRepo: AuthorRepo;
  #jwtToken: JwtService;

  constructor(userRepo: AuthorRepo, jwtToken: JwtService) {
    this.#userRepo = userRepo;
    this.#jwtToken = jwtToken;
  }

  async handle(input: Input): Promise<Output> {
    const user = await AuthorAuth.create(
      input.email,
      input.username,
      input.password
    );

    await this.#userRepo.create(user);
    const tokens = await this.#jwtToken.sign(user);
    return {
      id: user.id,
      token: tokens.accessToken,
      email: user.email,
      username: user.username,
      refreshToken: tokens.refreshToken,
    };
  }
}
