import  Teacher from "./Teacher";

export default interface Post{
    id: string;
    title: string;
    content: string;
    publishedAt: Date;
    author: Teacher;
  }