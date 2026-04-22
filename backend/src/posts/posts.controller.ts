import { Controller, Get, Body, Param, Put, Delete, UseGuards, Request, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() postData: Partial<Post>, @Request() req): Promise<Post> {
    return this.postsService.create(postData, req.user);
  }

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Post> {
    return this.postsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Post>): Promise<Post> {
    return this.postsService.update(+id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.postsService.delete(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async getFeed(@Request() req): Promise<Post[]> {
    return this.postsService.getFeed(req.user.id);
  }
}