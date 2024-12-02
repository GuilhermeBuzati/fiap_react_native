import type { JwtService, SignResult } from "#application/jwt_service.ts";
import jsonwebtoken from "jsonwebtoken";
import { Author } from "#domain/model/author.ts";
import { BaseError, BaseErrorEnum } from "#domain/error.ts";

export class JsonwebtokenJwtService implements JwtService {
  #privateKey: string;

  constructor(privateKey: string) {
    this.#privateKey = privateKey;
  }

  async sign(author: Author): Promise<SignResult> {
    const raw = {
      id: author.id,
      email: author.email,
      username: author.username,
      role: author.role,
    };

    const accessToken = jsonwebtoken.sign(
      { author: JSON.stringify(raw) },
      this.#privateKey,
      { expiresIn: "30m" },
    );

    const refreshToken = jsonwebtoken.sign(
      { authorId: raw.id },
      `${this.#privateKey}-refresh`,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  }

  async verify(token: string): Promise<Author> {
    try {
      const result = jsonwebtoken.verify(token, this.#privateKey) as any;
      const raw = JSON.parse(result.author);
      return new Author(raw.id, raw.email, raw.username, raw.role);
    } catch {
      throw new InvalidTokenError();
    }
  }

  async verifyRefresh(token: string): Promise<string> {
    try {
      const result = jsonwebtoken.verify(
        token,
        `${this.#privateKey}-refresh`,
      ) as any;
      return result.authorId;
    } catch {
      throw new InvalidTokenError();
    }
  }
}

export class InvalidTokenError extends BaseError {
  constructor() {
    super(BaseErrorEnum.authentication, "Token invalid");
  }
}
