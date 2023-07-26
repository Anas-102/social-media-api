import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateFollowDTO } from 'src/follow/dtos/createFollow.dto';
import { Follow } from 'src/follow/entities/follow.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private followdb: Repository<Follow>,
        @InjectRepository(User)
        private userdb: Repository<User>
    ) { }
    
    async followUser(id: number, t_id: number) {
        const source_user = await this.userdb.findOne({ where: { id: id } })
        const dest_user = await this.userdb.findOne({ where: { id: t_id } })
        const follow = new Follow();
        follow.follower = { id: id } as User
        follow.follwing = { id: t_id } as User
        if (await this.followdb.exist({ where: { follower: source_user, follwing: dest_user } })) {
            throw new HttpException('Already followed', HttpStatus.NOT_ACCEPTABLE)
        }
        return this.followdb.save(follow);
    }

    async unfollowUser(id: number, t_id: number) {
        const follow = new Follow();
        follow.follower = { id: id } as User;
        follow.follwing = { id: t_id } as User;
        const deleted = await this.followdb.delete(follow);
        if (deleted.affected) {
            return 'Unfollowed User';
        }
        return;
    }
}