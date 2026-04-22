import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from '../posts/posts.service';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async like(@Param('postId') postId: string, @Request() req) {
    const post = await this.postsService.findOne(+postId);
    return this.likesService.like(post, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async unlike(@Param('postId') postId: string, @Request() req) {
    return this.likesService.unlike(+postId, req.user.id);
  }

  @Get(':postId')
  async getLikes(@Param('postId') postId: string) {
    return this.likesService.getLikes(+postId);
  }
}