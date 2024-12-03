## Como executar

- Configure o .env dentro de "app/server" (com base em .env-default)

- dentro da pasta "server", execute.


    docker compose up --build


- dentro da pasta "app/", execute.

    npm i

- Depois:

    npm run start


- No nosso caso, testamos via "localhost:8081", porém construir para celular.


## Como utilizar


- Ao abrir a aplicação, será redirecionado para "Postagens";

- Sem autentição, será possível apenas listar postagem, cadastrar-se ou conectar-se;

- Usuário autenticados, são apenas professores, unicos que possuem cadastro de senha;

- Quando autenticado, o professor consegue:

    Create, editar, listar ou excluir postagens vinculada ao seu nome;
    Create, editar, listar ou excluir outros professores;
    Create, editar, listar ou excluir outros alunos;
    Desconectar;

    *Professor não consegue alterar ou excluir  postagens que não são de sua criação"

- Qualquer usuário consegue utilizar a filtragem de itens.

- Logout, realizar a remoção da autenticação no app.

## Ferramentas

- Utilizado React native expo para criação e arquitetura do projeto;
- Utilizado useState e useEffect para atualização de componentes na tela;
- Utilizado axios para integrar aplicação com a api back-end;
- Utilizado DrawerNavigator para navegação entre bottom tabs;



