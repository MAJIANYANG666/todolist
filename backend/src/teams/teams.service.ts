// teams.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async createTeam(name: string, members: User[]): Promise<Team> {
    const team = this.teamsRepository.create({ name, members });
    return this.teamsRepository.save(team);
  }

  async getTeams(): Promise<Team[]> {
    return this.teamsRepository.find({ relations: ['members'] });
  }
}
