import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { CommentDTO } from 'src/comments/dtos/comment.dto';
import { CommentService } from 'src/comments/services/comment/comment.service';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post('write/:post_id')
  writeComment(
    @Body() commentDTO: CommentDTO,
    @Req() request,
    @Param('post_id', ParseIntPipe) post_id: number,
  ) {
    const user = request.user.sub as number;
    return this.commentService.writeComment(user, post_id, commentDTO);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete('delete/:comment_id')
  deleteComment(
    @Req() request,
    @Param('comment_id', ParseIntPipe) comment_id: number,
  ) {
    const user = request.user.sub as number;
    return this.commentService.deleteComment(comment_id, user);
  }
}
