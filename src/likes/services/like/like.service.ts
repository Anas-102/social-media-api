import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from 'src/likes/entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes)
    private likedb: Repository<Likes>,
    @InjectRepository(Post)
    private postdb: Repository<Post>,
    @InjectRepository(User)
    private userdb: Repository<User>,
  ) {}
  async likePost(post_id: number, user_id: number) {
    const post = await this.postdb.findOne({
      where: { id: post_id },
    });
    const user = await this.userdb.findOne({ where: { id: user_id } });
    if (await this.likedb.findOne({ where: { post: post, user: user } })) {
      throw new HttpException('Already liked', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.likedb.save(this.likedb.create({ post: post, user:user }));
  }

  async unlikePost(post_id: number, user_id: number) {
    const post = await this.postdb.findOne({
      where: { id: post_id },
    });
    const user = await this.userdb.findOne({ where: { id: user_id } });
    const follow=await this.likedb.findOne({ where: { post: post, user: user } });
    await this.likedb.delete(follow)
  }
}
