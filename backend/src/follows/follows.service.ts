import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
  ) {}

  async follow(follower: User, following: User): Promise<Follow> {
    const follow = this.followsRepository.create({ follower, following });
    return this.followsRepository.save(follow);
  }

  async unfollow(followerId: number, followingId: number): Promise<void> {
    await this.followsRepository.delete({ follower: { id: followerId }, following: { id: followingId } });
  }

  async getFollowers(userId: number): Promise<User[]> {
    const follows = await this.followsRepository.find({ where: { following: { id: userId } }, relations: ['follower'] });
    return follows.map(f => f.follower);
  }

  async getFollowing(userId: number): Promise<User[]> {
    const follows = await this.followsRepository.find({ where: { follower: { id: userId } }, relations: ['following'] });
    return follows.map(f => f.following);
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const follow = await this.followsRepository.findOne({ where: { follower: { id: followerId }, following: { id: followingId } } });
    return !!follow;
  }
}