import { Controller, Post, Delete, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from '../posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async create(@Param('postId') postId: string, @Body('text') text: string, @Request() req) {
    const post = await this.postsService.findOne(+postId);
    return this.commentsService.create(text, post, req.user);
  }

  @Get(':postId')
  async findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(+postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentsService.delete(+id);
  }
}