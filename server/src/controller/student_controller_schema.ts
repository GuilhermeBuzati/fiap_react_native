import * as v from "valibot";

const id = v.pipe(v.string(), v.uuid("id inválido"));

const email = v.pipe(
  v.string("'email' deve ser uma string"),
  v.email("'email' invalido")
);

const create = v.object({
  email,
  username: v.string("'username' deve ser uma string'")
});

const update = v.object({
  id,
  email: v.optional(email),
  username: v.optional(v.string("'username' deve ser uma string'"))
});

export const StudentSchema = {
  create,
  update,
  id
};