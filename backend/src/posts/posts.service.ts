import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { FollowsService } from '../follows/follows.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private followsService: FollowsService,
  ) {}

  async create(postData: Partial<Post>, user: User): Promise<Post> {
    const post = this.postsRepository.create(postData);
    post.user = user;
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async findByUser(userId: number): Promise<Post[]> {
    return this.postsRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async update(id: number, updateData: Partial<Post>): Promise<Post> {
    await this.postsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async getFeed(userId: number): Promise<Post[]> {
    const following = await this.followsService.getFollowing(userId);
    const followingIds = following.map(u => u.id);
    return this.postsRepository.find({ where: { user: { id: In(followingIds) } }, relations: ['user'], order: { createdAt: 'DESC' } });
  }
}