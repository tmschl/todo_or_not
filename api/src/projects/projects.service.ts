import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async getUserProjects(id: number) {
    return await this.projectsRepository.find({ 
      where: { user: { id }}, 
      relations: ['features'],
    })
  }

  async createProject(name: string, description: string, userId: number) {
    await this.projectsRepository.save({
      name, 
      description,
      user: {
        id: userId,
      },
    })

    return await this.getUserProjects(userId);
  };
}
