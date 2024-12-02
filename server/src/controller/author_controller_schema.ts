import * as v from "valibot";

const id = v.pipe(v.string(), v.uuid("id inválido"));

const signIn = v.object({
  email: v.pipe(
    v.string("'email' deve ser uma string"),
    v.email("'email' invalido")
  ),
  password: v.pipe(
    v.string("'password' deve ser uma string'"),
    v.minLength(8, "'password' deve ter no mínimo 8 caracteres"),
    v.regex(/[a-z]/, "'password' deve conter letra minuscula"),
    v.regex(/[A-Z]/, "'password' deve conter letra maiúscula")
  ),
});

const signUp = v.object({
  email: v.pipe(
    v.string("'email' deve ser uma string"),
    v.email("'email' invalido")
  ),
  username: v.pipe(
    v.string("'username' deve ser uma string"),
    v.minLength(1, "'username' não pode ser vazio")
  ),
  password: v.pipe(
    v.string("'password' deve ser uma string'"),
    v.minLength(8, "'password' deve ter no mínimo 8 caracteres"),
    v.regex(/[a-z]/, "'password' deve conter letra minuscula"),
    v.regex(/[A-Z]/, "'password' deve conter letra maiúscula")
  ),
});

const update = v.object({
  id,
  email: v.optional(
    v.pipe(v.string("'email' deve ser uma string"), v.email("'email' invalido"))
  ),
  username: v.optional(
    v.pipe(
      v.string("'username' deve ser uma string"),
      v.minLength(1, "'username' não pode ser vazio")
    )
  ),
});

const refresh = v.object({
  refreshToken: v.string(),
});

export const AuthorSchema = {
  signIn,
  signUp,
  refresh,
  update,
};
