import type { Author } from "#domain/model/author.ts";

export interface JwtService {
  sign(content: Author): Promise<SignResult>;
  verify(token: string): Promise<Author>;
  verifyRefresh(token: string): Promise<string>;
}

export type SignResult = { accessToken: string; refreshToken: string };
