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
    private followdb: Repository<Follow>
  ) {}

  //   async fetchPosts() {
  //     return await this.postdb.find();
  //   }

  async fetchUserPosts(id: number) {
    const user = this.userdb.findOne({ where: { id: id } });
    const userPosts = await this.postdb.find({
      where: { user: { id: (await user).id } },
      relations: {user:true},
    });
      return userPosts;
  }

  async fetchFollowPosts(id: number) {
    const user=await this.userdb.findOne({where:{id:id}})
    const follower = await this.followdb.find({ where: { follower: user }, relations: { follower: true , follwing: true} })
    const users = follower.map((a) => a.follwing)
    return await this.postdb.find({ where: { user: users } });
    
  }

    createPost = async (user_id: number, info: CreatePostDTO) => {
      const user = await this.userdb.findOne({where:{id:user_id}})
        return await this.postdb.save(this.postdb.create({ ...info, user: user }));
  };

  updatePost = async (post_id: number, info: UpdatePostDTO) => {
    const updated = await this.postdb.update(post_id, { ...info });
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
