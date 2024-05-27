// comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Task } from '../tasks/task.entity';
import { User } from '../users/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(content: string, author: User, task: Task): Promise<Comment> {
    const comment = this.commentsRepository.create({ content, author, task, createdAt: new Date() });
    return this.commentsRepository.save(comment);
  }

  async getCommentsForTask(taskId: number): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { id: taskId }, relations: ['author'] });
  }
}
