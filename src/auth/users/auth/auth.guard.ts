import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/users/constants';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private rtdb: Repository<RefreshToken>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Not Logged in');
    }
    const rt = await this.rtdb.findOne({
      where: {
        Token: token,
        user:request.user
      },
      relations: {
        user: true
      }
    });
    console.log(rt)
    if (!rt) {
      throw new HttpException(
        'Kindly Login or Register now',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      console.log(request.user);
    } catch {
      throw new UnauthorizedException('catch block');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log(type);
    // console.log(token);
    return type === 'Bearer' ? token : undefined;
  }
}
// async function UserToken(:type) {
