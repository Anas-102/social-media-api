import { Module } from '@nestjs/common';
import { LikeService } from './services/like/like.service';
import { LikeController } from './controllers/like/like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes, User,RefreshToken,Post])
  ],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikesModule {}
