import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async follow(@Param('userId') userId: string, @Request() req) {
    const following = await this.usersService.findOne(+userId);
    return this.followsService.follow(req.user, following);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async unfollow(@Param('userId') userId: string, @Request() req) {
    return this.followsService.unfollow(req.user.id, +userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: string) {
    return this.followsService.getFollowers(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: string) {
    return this.followsService.getFollowing(+userId);
  }
}