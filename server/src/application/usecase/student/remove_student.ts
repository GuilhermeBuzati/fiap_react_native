import { GetAuthorError } from "#application/usecase/author/get_author.ts";
import { StudentRepo } from "#application/repo/student_repo.ts";

type Input = {
  id: string;
};

export class RemoveStudent {

  #studentRepo: StudentRepo;

  constructor(studentRepo: StudentRepo) {
    this.#studentRepo = studentRepo;
  }

  async handle(input: Input): Promise<void> {
    const author = await this.#studentRepo.getById(input.id);
    if (author === null) {
      throw new GetAuthorError();
    }

    await this.#studentRepo.delete(author.id);
  }
}