import { Module } from '@nestjs/common';
import { FollowService } from './services/follow/follow.service';
import { FollowController } from './controllers/follow/follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { User } from 'src/users/entities/user.entity';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Follow, User, RefreshToken])
    ],
  providers: [FollowService, AuthGuard],
  controllers: [FollowController]
})
export class FollowModule {}
