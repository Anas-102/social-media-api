import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Post, (post)=>post.likes)
    post: Post
}