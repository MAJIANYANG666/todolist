// notifications.module.ts
import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [TasksModule],
  providers: [NotificationsService],
})
export class NotificationsModule {}
