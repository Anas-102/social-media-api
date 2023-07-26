import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO } from 'src/comments/dtos/comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentdb: Repository<Comment>,
    @InjectRepository(Post)
    private postdb: Repository<Post>,
    @InjectRepository(User)
    private userdb: Repository<User>,
  ) {}

  async writeComment(user_id: number, post_id: number, content: CommentDTO) {
    const post = await this.postdb.findOne({
      where: { id: post_id },
    });
    const user = await this.userdb.findOne({ where: { id: user_id } });
    const comment = await this.commentdb.create({
      ...content,
      user: user,
      post: post,
    });
    return this.commentdb.save(comment);
  }

  async deleteComment(comment_id:number, user_id:number) {
      //const user = await this.userdb.findOne({ where: { id: user_id } })
      const comment = await this.commentdb.findOne({ where: { id: comment_id, user: {id:user_id} }, relations: { user: true } })
      console.log(comment)
      if (!comment) {
        throw new NotFoundException('Comment doesnt exist');
      }
      await this.commentdb.remove(comment);
      return 'deleted';
    
  }
}
