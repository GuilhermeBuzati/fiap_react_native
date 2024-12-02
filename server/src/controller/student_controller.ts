import {
  Controller,
  ControllerResponse,
  EndpointFn,
  mapDelete,
  mapGet,
  mapPost,
  mapPut
} from "#controller/controller.ts";
import { Uc } from "#application/usecase/_factory.ts";
import { CreateStudent } from "#application/usecase/student/create_student.ts";
import { StudentSchema } from "#controller/student_controller_schema.ts";
import { UpdateStudent } from "#application/usecase/student/update_student.ts";
import { RemoveStudent } from "#application/usecase/student/remove_student.ts";
import { GetStudents } from "#application/usecase/student/get_students.ts";
import { GetStudentById } from "#application/usecase/student/get_student.ts";

export function createStudentController(uc: Uc): Controller {

  const index: EndpointFn = async () => {
    const useCase = uc(GetStudents);
    const result = await useCase.handle();
    return ControllerResponse.ok(result);
  };

  const show: EndpointFn = async (ctx) => {
    const id = ctx.param("id");
    const useCase = uc(GetStudentById);
    const result = await useCase.handle({ id });
    if (result === null) {
      return ControllerResponse.noContent();
    }

    return ControllerResponse.ok(result);
  };

  const create: EndpointFn = async (ctx) => {
    const body = ctx.body(StudentSchema.create);
    const useCase = uc(CreateStudent);
    const result = await useCase.handle(body);
    return ControllerResponse.ok(result);
  };

  const update: EndpointFn = async (ctx) => {
    const body = ctx.body(StudentSchema.update);
    const useCase = uc(UpdateStudent);
    const result = await useCase.handle({
      id: body.id,
      newEmail: body.email,
      newUsername: body.username
    });

    return ControllerResponse.ok(result);
  };

  const remove: EndpointFn = async (ctx) => {
    const id = ctx.param("id");
    const useCase = uc(RemoveStudent);
    await useCase.handle({ id });
    return ControllerResponse.noContent();
  };

  return {
    route: "/students",
    endpoints: [
      mapGet("/", index, { anonymous: true }),
      mapGet("/:id", show, { anonymous: true }),
      mapPost("/", create),
      mapPut("/:id", update),
      mapDelete("/:id", remove)
    ]
  };
}