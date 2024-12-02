import type { Server } from "#application/server.ts";
import express, {
  type Express,
  Router,
  ErrorRequestHandler,
  Handler,
} from "express";
import { ExpressAuthMiddleware } from "./express_controller_middlewares.ts";
import { JwtService } from "#application/jwt_service.ts";
import swagger from "swagger-ui-express";
import cors from "cors";

import json from "../../swagger.json";
import { Controller, EndpointOptions } from "#controller/controller.ts";
import { BaseError, BaseErrorEnum } from "#domain/error.ts";
import { ExpressControllerContext } from "./express_controller_request.ts";
import { AuthorRepo } from "#application/repo/author_repo.ts";

export class ExpressServer implements Server {
  #express: Express;

  #auth: ExpressAuthMiddleware;

  constructor(jwtService: JwtService) {
    this.#express = express();
    this.#express.use(cors());
    this.#express.use(express.json());
    this.#express.use("/swagger", swagger.serve, swagger.setup(json));
    this.#auth = new ExpressAuthMiddleware(jwtService);
  }

  addController(controller: Controller): void {
    const router = Router();
    for (const { fn, method, path, anonymous } of controller.endpoints) {
      const options = { anonymous };
      router[method](path, ...this.#middlewares(options), async (req, res) => {
        try {
          const ctx = new ExpressControllerContext(req, res);
          const result = await fn(ctx);
          return res.status(result.status).json(result.content);
        } catch (err) {
          console.error(err);
          if (BaseError.isInstance(err)) {
            if (err.type === BaseErrorEnum.validation) {
              return res.status(400).send({ error: err.message });
            }

            if (err.type === BaseErrorEnum.authentication) {
              return res.status(401).send();
            }

            if (err.type === BaseErrorEnum.authorization) {
              return res.status(403).send();
            }
          }

          return res.status(500).send({ error: "Erro interno" });
        }
      });
    }

    this.#express.use(controller.route, router);
  }

  listen(port: number): void {
    this.#express.listen(port);
  }

  #middlewares(options: EndpointOptions = {}): Handler[] {
    const result: Handler[] = [];
    if (!options.anonymous) {
      result.push(this.#auth.handle);
    }

    return result;
  }
}
