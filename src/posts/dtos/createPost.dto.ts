import { IsNotEmpty } from 'class-validator';
import { type } from 'os';

export class CreatePostDTO {
  @IsNotEmpty()
  content: string;

  image: string;

  createdAt: Date;
  updatedAt: Date;
}
