import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/auth.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
  
  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async createUser(user: SignUpDto) {
    return await this.userRepository.save({ ...user })
  }
}
