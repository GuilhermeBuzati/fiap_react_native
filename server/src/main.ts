import { env } from "node:process";
import { parseEnv } from "./main_environment.ts";

import { KyselyRepoFactory } from "#infrastructure/repo_adapter/_factory.ts";
import { JsonwebtokenJwtService } from "#infrastructure/jsonwebtoken_jwt_service.ts";
import { ExpressServer } from "#infrastructure/server_adapter/express_server.ts";

import { createContainer, registerContainer } from "#application/usecase/_factory.ts";
import { applyMigration } from "./main_migration.ts";

import { createAuthorController, createPostController } from "#controller/mod.ts";
import { KyselyDaoFactory } from "#infrastructure/dao_adapter/_factory.ts";
import { createStudentController } from "#controller/student_controller.ts";

const environment = parseEnv(env);

const jwtService = new JsonwebtokenJwtService(environment.secret);

const repoFac = new KyselyRepoFactory(environment.database);
const daoFac = new KyselyDaoFactory(repoFac.connection);
await applyMigration(repoFac.connection);

const container = createContainer(repoFac, daoFac, jwtService);
const uc = registerContainer(container);

const server = new ExpressServer(jwtService);
server.addController(createPostController(uc));
server.addController(createAuthorController(uc));
server.addController(createStudentController(uc))
server.listen(environment.port);