import { Student } from "#domain/model/student.ts";

export interface StudentDao {
  getMany(): Promise<StudentDaoModel[]>;
  getById(id: string): Promise<Student | null>;
}

export type StudentDaoModel = {
  id: string;
  username: string;
  email: string;
}