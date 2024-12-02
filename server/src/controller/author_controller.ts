import {
  type Controller,
  ControllerResponse,
  type EndpointFn,
  mapDelete,
  mapGet,
  mapPost,
  mapPut,
} from "#controller/controller.ts";
import { AuthorSchema } from "./author_controller_schema.ts";
import { Uc } from "#application/usecase/_factory.ts";
import { GetUser } from "#application/usecase/author/get_author.ts";
import { CreateAuthor } from "#application/usecase/author/create_author.ts";
import { RefreshToken } from "#application/usecase/author/refresh_token.ts";
import { GetAuthors } from "#application/usecase/author/get_authors.ts";
import { RemoveAuthor } from "#application/usecase/author/remove_author.ts";
import { UpdateAuthor } from "#application/usecase/author/update_author.ts";

export function createAuthorController(uc: Uc): Controller {
  const index: EndpointFn = async () => {
    const useCase = uc(GetAuthors);
    const result = await useCase.handle();
    return ControllerResponse.ok(result);
  };

  const update: EndpointFn = async (ctx) => {
    const body = ctx.body(AuthorSchema.update);
    const useCase = uc(UpdateAuthor);
    const result = await useCase.handle({
      id: body.id,
      newEmail: body.email,
      newUsername: body.username,
    });
    return ControllerResponse.ok(result);
  };

  const remove: EndpointFn = async (ctx) => {
    const id = ctx.param("id");
    const useCase = uc(RemoveAuthor);
    await useCase.handle({ id });
    return ControllerResponse.ok({ oi: "OI OI OI" });
  };

  const signIn: EndpointFn = async (ctx) => {
    const body = ctx.body(AuthorSchema.signIn);
    const useCase = uc(GetUser);
    const result = await useCase.handle(body);
    return ControllerResponse.ok(result);
  };

  const signUp: EndpointFn = async (ctx) => {
    const body = ctx.body(AuthorSchema.signUp);
    const useCase = uc(CreateAuthor);
    const result = await useCase.handle(body);
    return ControllerResponse.created(result);
  };

  const refresh: EndpointFn = async (ctx) => {
    const body = ctx.body(AuthorSchema.refresh);
    const useCase = uc(RefreshToken);
    const result = await useCase.handle(body);
    return ControllerResponse.ok(result);
  };

  return {
    route: "/authors",
    endpoints: [
      mapGet("/", index),
      mapPut("/:id", update),
      mapDelete("/:id", remove),
      mapPost("/refresh", refresh, { anonymous: true }),
      mapPost("/signin", signIn, { anonymous: true }),
      mapPost("/signup", signUp, { anonymous: true }),
    ],
  };
}
