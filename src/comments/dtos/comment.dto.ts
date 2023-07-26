import { IsNotEmpty } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  content: string
}
