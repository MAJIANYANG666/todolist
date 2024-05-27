// tasks.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() task: Partial<Task>) {
    return this.tasksService.createTask(task);
  }

  @Get(':userId')
  getTasksForUser(@Param('userId') userId: number) {
    return this.tasksService.getTasksForUser(userId);
  }

  @Patch(':taskId')
  updateTask(@Param('taskId') taskId: number, @Body() updates: Partial<Task>) {
    return this.tasksService.updateTask(taskId, updates);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }

  @Post(':taskId/subtasks')
  createSubTask(@Param('taskId') taskId: number, @Body() subTask: Partial<Task>) {
    return this.tasksService.createSubTask(taskId, subTask);
  }

  @Patch('subtasks/:subTaskId/complete')
  completeSubTask(@Param('subTaskId') subTaskId: number) {
    return this.tasksService.completeSubTask(subTaskId);
  }
}
