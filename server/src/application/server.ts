import type { Controller } from "../controller/controller.ts";

export interface Server {
  addController(controller: Controller): void;
  listen(port: number): void;
}
