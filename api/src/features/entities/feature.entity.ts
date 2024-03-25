import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  // user id foreign key
  @ManyToOne(() => Project, (project) => project.features)
  project: Project; 

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;


  @Column({default: 'To Do'})
  status: string;

}