import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { CreatePostDTO } from 'src/posts/dtos/createPost.dto';
import { UpdatePostDTO } from 'src/posts/dtos/updatePost.dto';
import { PostService } from 'src/posts/services/post/post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  //   @Get('api')
  //   fetchPosts() {
  //     return this.postService.fetchPosts();
  //   }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get('myPosts')
  fetchUserPost(@Req() request) {
    const user = request.user.sub as number;
    return this.postService.fetchUserPosts(user);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get('followedPost')
  fetchFollowPosts(@Req() request) {
    const user = request.user.sub as number;
    return this.postService.fetchFollowPosts(user);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post('create')
  createPost(@Req() request, @Body() details: CreatePostDTO) {
    const user = request.user.sub as number;
    return this.postService.createPost(user, details);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Put('update/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() details: UpdatePostDTO,
  ) {
    return this.postService.updatePost(id, { ...details });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete('remove/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
