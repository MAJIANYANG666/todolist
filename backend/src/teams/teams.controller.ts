// teams.controller.ts
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/users.entity';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  createTeam(@Body('name') name: string, @Body('members') members: User[]) {
    return this.teamsService.createTeam(name, members);
  }

  @Get()
  getTeams() {
    return this.teamsService.getTeams();
  }
}
