import { Request, Response } from "express";
import {
  ControllerInvalidBodyError,
  ControllerNoParamError,
  ControllerNoUserError,
  ControllerContext,
} from "#controller/controller";
import { Author, AuthorAuth } from "#domain/model/author.ts";
import { BaseSchema, InferOutput, parse } from "valibot";
import { IncomingHttpHeaders } from "node:http";

export class ExpressControllerContext implements ControllerContext {
  #req: Request;
  #res: Response;

  constructor(req: Request, res: Response) {
    this.#req = req;
    this.#res = res;
  }

  body<T extends BaseSchema<any, any, any>>(schema: T): InferOutput<T> {
    try {
      return parse(schema, this.#req.body);
    } catch (e) {
      throw new ControllerInvalidBodyError((e as any).message ?? `${e}`);
    }
  }

  param(key: string): string {
    const result: string | null = this.#req.params[key] ?? null;
    if (result === null) {
      throw new ControllerNoParamError(key);
    }

    return result;
  }

  query(key: string): string | null {
    return (this.#req.query[key] ?? null) as any;
  }

  header(key: keyof IncomingHttpHeaders): string | null {
    return (this.#req.headers[key] ?? null) as any;
  }

  user(): Author {
    const user: AuthorAuth | null = this.#res.locals.user ?? null;
    if (user === null) {
      throw new ControllerNoUserError();
    }

    return user;
  }
}
