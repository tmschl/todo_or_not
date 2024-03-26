import { Feature } from 'src/features/entities/feature.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class UserStory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Feature, (feature) => feature.userStories)
  feature: Feature; 

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Task, (task) => task.userStory)
  tasks: Task[];
}