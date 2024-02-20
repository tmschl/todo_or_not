import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  
  async addName(name: string) {
    await this.namesRepository.save({ name })
    return await this.getNames(); 
  }

  async getNames() {
    return await this.namesRepository.find();
  }
}
