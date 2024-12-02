import { Student } from "#domain/model/student.ts";

export interface StudentRepo {
  create(model: Student): Promise<void>;
  delete(id: string): Promise<void>;
  update(model: Student): Promise<void>;
  getById(id: string): Promise<Student | null>;
}