import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async like(post: Post, user: User): Promise<Like> {
    const like = this.likesRepository.create({ post, user });
    return this.likesRepository.save(like);
  }

  async unlike(postId: number, userId: number): Promise<void> {
    await this.likesRepository.delete({ post: { id: postId }, user: { id: userId } });
  }

  async getLikes(postId: number): Promise<Like[]> {
    return this.likesRepository.find({ where: { post: { id: postId } }, relations: ['user'] });
  }

  async isLiked(postId: number, userId: number): Promise<boolean> {
    const like = await this.likesRepository.findOne({ where: { post: { id: postId }, user: { id: userId } } });
    return !!like;
  }
}