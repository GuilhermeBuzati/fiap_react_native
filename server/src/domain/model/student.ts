import { createGuid } from "#domain/service/guid.ts";

export class Student {
  id: string;
  email: string;
  username: string;

  constructor(id: string, email: string, username: string) {
    this.id = id;
    this.email = email;
    this.username = username;
  }
  
  static create(email: string, username: string): Student {
    const id = createGuid();
    return new Student(id, email, username);
  }
}