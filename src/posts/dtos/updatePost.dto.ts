import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {

    @IsNotEmpty()
  content?: string;

  image: string;

  updatedAt: Date
}
