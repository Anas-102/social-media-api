import { Module } from '@nestjs/common';
import { PostService } from './services/post/post.service';
import { PostController } from './controllers/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AuthModule } from 'src/auth/users/auth/auth.module';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';
import { User } from 'src/users/entities/user.entity';
import { Follow } from 'src/follow/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, RefreshToken, User, Follow]),
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  providers: [PostService, AuthGuard],
  controllers: [PostController],
})
export class PostModule {}
