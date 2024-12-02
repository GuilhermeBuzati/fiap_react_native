import {
  type Controller,
  ControllerInvalidParamError,
  ControllerResponse,
  EndpointFn,
  mapDelete,
  mapGet,
  mapPost,
  mapPut
} from "#controller/controller.ts";
import { safeParse } from "valibot";
import { PostSchema } from "./post_controller_schema.ts";
import { Uc } from "#application/usecase/_factory.ts";
import { CreatePost } from "#application/usecase/post/create_post.ts";
import { DeletePost } from "#application/usecase/post/delete_post.ts";
import { GetPosts } from "#application/usecase/post/get_posts.ts";
import { GetPostById } from "#application/usecase/post/get_post_by_id.ts";
import { UpdatePost } from "#application/usecase/post/update_post.ts";


export function createPostController(uc: Uc): Controller {

  const create: EndpointFn = async (ctx) => {
    const currentAuthorId = ctx.user().id;
    const body = ctx.body(PostSchema.create);
    const useCase = uc(CreatePost)
    const result = await useCase.handle({ ...body, currentAuthorId });
    return ControllerResponse.created(result);
  };

  const remove: EndpointFn = async (ctx) => {
    const currentAuthorId = ctx.user().id;
    const id = ctx.param("id");
    const useCase = uc(DeletePost);
    await useCase.handle({ id, currentAuthorId });
    return ControllerResponse.noContent();
  };

  const index: EndpointFn = async (ctx) => {
    const query = ctx.query("q") ?? undefined;
    const useCase = uc(GetPosts);
    const result = await useCase.handle({ query });
    return ControllerResponse.ok(result);
  };

  const show: EndpointFn = async (ctx) => {
    const id = ctx.param("id");
    const idResult = safeParse(PostSchema.id, id);
    if (!idResult.success) {
      throw new ControllerInvalidParamError(idResult.issues[0].message);
    }

    const useCase = uc(GetPostById);
    const result = await useCase.handle({ id });
    if (result === null) {
      return ControllerResponse.noContent();
    }

    return ControllerResponse.ok(result);
  };

  const indexAdmin: EndpointFn = async (ctx) => {
    const authorId = ctx.user().id;
    const query = ctx.query("q") ?? undefined;
    const useCase = uc(GetPosts);
    const result = await useCase.handle({ query, authorId });
    return ControllerResponse.ok(result);
  };

  const update: EndpointFn = async (ctx) => {
    const currentAuthorId = ctx.user().id;
    const body = ctx.body(PostSchema.update);
    const id = ctx.param("id");
    if (body.id !== id) {
      return ControllerResponse.badRequest({ error: "Id incompatível" });
    }

    const useCase = uc(UpdatePost);
    const result = await useCase.handle({ ...body, currentAuthorId });
    return ControllerResponse.ok(result);
  };

  return {
    route: "/posts",
    endpoints: [
      mapGet("/", index, { anonymous: true }),
      mapGet("/search", index, { anonymous: true }),
      mapGet("/admin", indexAdmin),
      mapGet("/:id", show, { anonymous: true }),
      mapPut("/:id", update),
      mapPost("/", create),
      mapDelete("/:id", remove),
    ],
  };
}
