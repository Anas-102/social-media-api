import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {
  id: number;

    @IsNotEmpty()
  content?: string;

  image: string;

  updatedAt: Date
}
