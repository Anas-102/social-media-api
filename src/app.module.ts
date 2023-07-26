import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/users/auth/auth.module';
import { RefreshToken } from './users/entities/refresh_token.entity';
import { User } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { PostModule } from './posts/post.module';
import { Post } from './posts/entities/post.entity';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/entities/follow.entity';
import { LikesModule } from './likes/likes.module';
import { Likes } from './likes/entities/like.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '051001@Hashmani',
      database: 'social-media-app',
      entities: [User, RefreshToken, Post, Follow, Likes, Comment],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    PostModule,
    FollowModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private datasource: DataSource){ }
}
