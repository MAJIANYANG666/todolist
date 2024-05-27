// tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async getTasksForUser(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { id: userId } });
  }

  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(taskId, updates);
    return this.tasksRepository.findOne({ where : { id: taskId }});
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }

  async createSubTask(taskId: number, subTask: Partial<Task>): Promise<Task> {
    const parentTask = await this.tasksRepository.findOne({
        where: { id: taskId },
        relations: ['subTasks'],
      });
    if (!parentTask) {
      throw new Error('Parent task not found');
    }

    const newSubTask = this.tasksRepository.create(subTask);
    newSubTask.parentTask = parentTask;
    return this.tasksRepository.save(newSubTask);
  }

  async completeSubTask(subTaskId: number): Promise<Task> {
    const subTask = await this.tasksRepository.findOne(
        {
            where: { id: subTaskId },
            relations: ['parentTask'],
          }
        );
    if (!subTask) {
      throw new Error('Sub task not found');
    }

    subTask.status = 'completed';
    await this.tasksRepository.save(subTask);

    const parentTask = await this.tasksRepository.findOne(
        {
            where: { id: subTask.parentTask.id },
            relations: ['subTasks'],
          }
        );
    const allSubTasksCompleted = parentTask.subTasks.every(task => task.status === 'completed');

    if (allSubTasksCompleted) {
      parentTask.status = 'completed';
      await this.tasksRepository.save(parentTask);
    }

    return subTask;
  }

  async getTasksDueInNextHour(): Promise<Task[]> {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    return this.tasksRepository.find({
      where: { dueDate: Between(now, oneHourLater), status: 'pending' },
    });
  }
}
