// notifications.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class NotificationsService {
  constructor(private tasksService: TasksService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const tasks = await this.tasksService.getTasksDueInNextHour();
    for (const task of tasks) {
      // 发送提醒逻辑
      console.log(`Reminder: Task "${task.title}" is due soon.`);
    }
  }
}
