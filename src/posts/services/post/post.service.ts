import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follow/entities/follow.entity';
import { CreatePostDTO } from 'src/posts/dtos/createPost.dto';
import { UpdatePostDTO } from 'src/posts/dtos/updatePost.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postdb: Repository<Post>,
    @InjectRepository(User)
    private userdb: Repository<User>,
    @InjectRepository(Follow)
    private followdb: Repository<Follow>,
  ) {}

  //   async fetchPosts() {
  //     return await this.postdb.find();
  //   }

  async fetchUserPosts(id: number) {
    const user = this.userdb.findOne({ where: { id: id } });
    const userPosts = await this.postdb.find({
      where: { user: { id: (await user).id } },
      relations: { user: true },
    });
    return userPosts;
  }

  async fetchFollowPosts(
    id: number,
    page: number,
    limit: number,
    sortBy: string,
  ) {
    const skip = (page - 1) * limit;
    const [sortCol, sortOrder] = sortBy.split(':');
    const user = await this.userdb.findOne({ where: { id: id } });
    const follower = await this.followdb.find({
      where: { follower: user },
      relations: { follower: true, follwing: true },
    });
    const users = follower.map((a) => a.follwing);
    try {
      return await this.postdb.find({
        where: { user: users },
        skip,
        take: limit,
        order: {
          [sortCol]: sortOrder === 'desc' ? 'DESC' : 'ASC',
        },
      });
    } catch (error) {
      return 'Column name doesnt exist';
    }
  }

  createPost = async (user_id: number, info: CreatePostDTO) => {
    const user = await this.userdb.findOne({ where: { id: user_id } });
    return await this.postdb.save(this.postdb.create({ ...info, user: user }));
  };

  updatePost = async (post_id: number, info: UpdatePostDTO) => {
    const updated = await this.postdb.update(post_id, { ...info });
    if (!updated.affected) {
      return 'You havent updated anything';
    }
    return await this.postdb.find({ where: { id: post_id } });
  };

  deletePost = async (post_id: number) => {
    const deleted = await this.postdb.delete(post_id);
    if (!deleted.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return 'Post Deleted';
  };
}
