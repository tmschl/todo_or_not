import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private namesRepository: Repository<User>,
  ) {}
  
  // async addName(firstName: string, lastName: string) {
  //   await this.namesRepository.save({ first_name: firstName, last_name: lastName })
  //   return await this.getNames(); 
  // }

  // async getNames() {
  //   return await this.namesRepository.find();
  // }
}
