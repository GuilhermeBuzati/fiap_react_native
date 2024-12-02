import { StudentDao } from "#application/dao/student_dao.ts";

type Input = {
  id: string;
};

type Output = {
  id: string;
  username: string;
  email: string;
} | null;

export class GetStudentById {
  studentDao: StudentDao;

  constructor(studentDao: StudentDao) {
    this.studentDao = studentDao;
  }

  async handle(input: Input): Promise<Output> {
    return await this.studentDao.getById(input.id);
  }
}