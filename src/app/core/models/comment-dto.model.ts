export class CommentDTO {
  id: number;
  content: string;
  username: string;

  constructor(id: number, content: string, username: string) {
    this.id = id;
    this.content = content;
    this.username = username;
  }
}
