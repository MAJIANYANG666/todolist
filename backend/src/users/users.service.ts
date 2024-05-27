// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, email: string): Promise<User> {
    const user = this.usersRepository.create({ username, password, email });
    return this.usersRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id}})
  }
}
