import { Student } from "#domain/model/student.ts";
import { StudentRepo } from "#application/repo/student_repo.ts";

type Input = {
  email: string;
  username: string;
};

type Output = {
  id: string;
  username: string;
  email: string;
};

export class CreateStudent {
  #studentRepo: StudentRepo;

  constructor(studentRepo: StudentRepo) {
    this.#studentRepo = studentRepo;
  }

  async handle(input: Input): Promise<Output> {
    const student = Student.create(
      input.email,
      input.username,
    );

    await this.#studentRepo.create(student);
    return {
      id: student.id,
      email: student.email,
      username: student.username,
    };
  }
}
