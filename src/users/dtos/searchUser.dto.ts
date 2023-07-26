import { IsNotEmpty } from "class-validator";

export class SearchUserDTO{
    @IsNotEmpty()
    username: string
}