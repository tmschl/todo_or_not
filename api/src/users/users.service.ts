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
    return await this.userRepository.findOne({ where: { username }});
  }

  async addUser(user: SignUpDto) {
    return await this.userRepository.save({ ...user })

  }
}
