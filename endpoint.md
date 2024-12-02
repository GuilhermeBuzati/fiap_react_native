# Student

## Criar

- Precisa estar logado

POST http://localhost:3000/students

```json
{
  "username": "Teste 1",
  "email": "teste@email.com"
}
```

## Atualizar

- Precisa estar logado

PUT http://localhost:3000/students/:studentId

```json
{
  "id": "05fda891-4871-4845-80ca-669c6d907cec",
  "username": "Teste Novo", // Opcional
  "email": "teste@email.com" // Opcional
}
```

## Remover

- Precisa estar logado

DELETE http://localhost:3000/students/:studentId

## Lista Estudantes

GET http://localhost:3000/students

## Lista Estudante por Id

GET http://localhost:3000/students/:studentId

# Author

## Criar

POST http://localhost:3000/authors/signUp

```json
{
  "username": "Teste 1",
  "email": "teste@email.com",
  "password": "TesteSenha123"
}
```

## Atualizar

- Precisa estar logado

PUT http://localhost:3000/authors/:authorId

```json
{
  "id": "05fda891-4871-4845-80ca-669c6d907cec",
  "username": "Teste Novo", // Opcional
  "email": "teste@email.com" // Opcional
}
```

## Remover

- Precisa estar logado

DELETE http://localhost:3000/authors/:studentId

## Lista Autores

GET http://localhost:3000/authors
