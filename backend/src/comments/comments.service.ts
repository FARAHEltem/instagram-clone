import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(text: string, post: Post, user: User): Promise<Comment> {
    const comment = this.commentsRepository.create({ text, post, user });
    return this.commentsRepository.save(comment);
  }

  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { post: { id: postId } }, relations: ['user'] });
  }

  async delete(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}