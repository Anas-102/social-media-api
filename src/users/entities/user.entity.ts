import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshToken } from './refresh_token.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RefreshToken, (refresh) => refresh.user, { cascade: true })
  refresh: RefreshToken;

  @Column({ default: null })
  profileImage: string;

  @OneToMany(() => Post, (posts) => posts.user, { cascade: true })
  posts: Post[];
}
