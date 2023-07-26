import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment/comment.controller';
import { CommentService } from './services/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, RefreshToken ])
  ],
  providers: [CommentService, AuthGuard],
  controllers: [CommentController]
})
export class CommentsModule {
}
