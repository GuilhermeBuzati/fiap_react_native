import { GetAuthorError } from "#application/usecase/author/get_author.ts";
import { StudentRepo } from "#application/repo/student_repo.ts";

type Input = {
  id: string;
  newUsername?: string;
  newEmail?: string;
}

type Output = {
  id: string;
  username: string;
  email: string;
}

export class UpdateStudent {
  
  studentRepo: StudentRepo;
  
  constructor(studentRepo: StudentRepo) {
    this.studentRepo = studentRepo;
  }
  
  async handle(input: Input): Promise<Output> {
    const student = await this.studentRepo.getById(input.id);
    if (student === null) {
      throw new GetAuthorError();
    }
    
    let changed = false;
    if (input.newUsername) {
      student.username = input.newUsername;
      changed = true;
    } 
    
    if (input.newEmail) {
      student.email = input.newEmail;
      changed = true;
    }
    
    if (changed) {
      await this.studentRepo.update(student);
    }
    
    return {
      id: student.id,
      username: student.username,
      email: student.email,
    }
  }
}