import { StudentDao, StudentDaoModel } from "#application/dao/student_dao.ts";

type Output = StudentDaoModel[];

export class GetStudents {

  studentDao: StudentDao;

  constructor(studentDao: StudentDao) {
    this.studentDao = studentDao;
  }

  async handle(): Promise<Output> {
    return await this.studentDao.getMany()
  }
}