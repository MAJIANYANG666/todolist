// task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Comment } from '../comments/comment.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.tasks)
  creator: User;

  @ManyToOne(() => User, user => user.assignedTasks)
  assignee: User;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @OneToMany(() => Task, task => task.parentTask)
  subTasks: Task[];

  @ManyToOne(() => Task, task => task.subTasks)
  parentTask: Task;
}

