import type { Author } from "#domain/model/author.ts";
import { BaseSchema, type InferOutput } from "valibot";
import { BaseError, BaseErrorEnum } from "#domain/error.ts";
import { IncomingHttpHeaders } from "node:http";

type Schema = BaseSchema<any, any, any>;

export interface Controller {
  endpoints: Endpoint[];
  route: string;
}

export interface ControllerContext {
  body<T extends Schema>(schema: T): InferOutput<T>;
  param(key: string): string;
  query(key: string): string | null;
  header(key: keyof IncomingHttpHeaders): string | null;
  user(): Author;
}

export type EndpointOptions = { anonymous?: boolean };

export function mapPost(
  path: string,
  fn: EndpointFn,
  options: EndpointOptions = {},
): Endpoint {
  return { method: "post", path, fn, anonymous: options?.anonymous ?? false };
}

export function mapGet(
  path: string,
  fn: EndpointFn,
  options: EndpointOptions = {},
): Endpoint {
  return { method: "get", path, fn, anonymous: options?.anonymous ?? false };
}

export function mapPut(
  path: string,
  fn: EndpointFn,
  options: EndpointOptions = {},
): Endpoint {
  return { method: "put", path, fn, anonymous: options?.anonymous ?? false };
}

export function mapDelete(
  path: string,
  fn: EndpointFn,
  options: EndpointOptions = {},
): Endpoint {
  return { method: "delete", path, fn, anonymous: options?.anonymous ?? false };
}

export type Endpoint = {
  method: "post" | "put" | "delete" | "get";
  fn: EndpointFn;
  path: string;
  anonymous?: boolean;
};

export type EndpointFn = (
  ctx: ControllerContext,
) => Promise<ControllerResponse>;

export class ControllerResponse {
  status: number;
  content: any;

  constructor(content: any, status: number = 200) {
    this.content = content;
    this.status = status;
  }

  static ok(content: any): ControllerResponse {
    return new ControllerResponse(content, 200);
  }

  static badRequest(content: any): ControllerResponse {
    return new ControllerResponse({ error: content }, 400);
  }

  static created(content: any): ControllerResponse {
    return new ControllerResponse(content, 201);
  }

  static noContent(): ControllerResponse {
    return new ControllerResponse(null, 204);
  }
}

export class ControllerInvalidBodyError extends BaseError {
  constructor(message: string) {
    super(BaseErrorEnum.validation, message);
  }
}

export class ControllerNoParamError extends BaseError {
  constructor(message: string) {
    super(BaseErrorEnum.validation, message);
  }
}

export class ControllerInvalidParamError extends BaseError {
  constructor(message: string) {
    super(BaseErrorEnum.validation, message);
  }
}

export class ControllerNoUserError extends BaseError {
  constructor() {
    super(BaseErrorEnum.authorization, "Usuário não logado");
  }
}
