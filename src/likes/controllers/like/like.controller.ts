import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from 'src/likes/services/like/like.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { request } from 'http';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
 @ApiTags('Likes')
 @Controller('like')
 export class LikeController {
   constructor(private likeService: LikeService) {}

   @ApiBearerAuth('jwt')
   @UseGuards(AuthGuard)
   @Post('like/:post_id')
   likePost(@Param('post_id', ParseIntPipe) post_id: number, @Req() request) {
     const user = request.user.sub as number;
     console.log(request.user.sub);
     return this.likeService.likePost(post_id, user);
   }

   @ApiBearerAuth('jwt')
   @UseGuards(AuthGuard)
   @Delete('unlike/:post_id')
   unlikePost(@Param('post_id', ParseIntPipe) post_id: number, @Req() request) {
     const user = request.user.sub as number;
     console.log(request.user.sub);
     return this.likeService.unlikePost(post_id, user);
   }
 }
