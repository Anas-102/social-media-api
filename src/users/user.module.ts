import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { AuthService } from 'src/auth/users/auth/auth.service';
import { RefreshToken } from './entities/refresh_token.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    //AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, AuthGuard],
})
export class UserModule {}
