import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
// import { CreateFollowDTO } from 'src/follow/dtos/createFollow.dto';
import { FollowService } from 'src/follow/services/follow/follow.service';
@ApiTags('Follows')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post(':following_id')
  followUser(
    @Req() request,
    @Param('following_id', ParseIntPipe) following_id: number,
  ) {
    const user = request.user.sub as number;
    return this.followService.followUser(user, following_id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete('unfollow/:following_id')
  unfollowUser(@Req() request, @Param('following_id', ParseIntPipe) following_id: number) {
    const user = request.user.sub as number;
    return this.followService.unfollowUser(user, following_id);
  }
}
