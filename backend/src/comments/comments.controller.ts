// comments.controller.ts
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/users.entity';
import { Task } from 'src/tasks/task.entity';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  createComment(@Body() body) {
    const { content, authorId, taskId } = body;
    return this.commentsService.createComment(content, { id: authorId } as User, { id: taskId } as Task);
  }

  @Get('task/:taskId')
  getCommentsForTask(@Param('taskId') taskId: number) {
    return this.commentsService.getCommentsForTask(taskId);
  }
}
