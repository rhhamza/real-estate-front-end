import { IBadWords } from "../interfaces/badwordInterface";

export class BadWords {
  id: number;
  word: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IBadWords) {
    this.id = data.id;
    this.word = data.word;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}