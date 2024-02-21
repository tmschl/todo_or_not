import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async logIn(username, password) {
    const user = await this.usersService.findUserByUsername(username);
    if (user !== null) {
      // compare the passwords
      const passwordsMatch = bcrypt.compare(password, user.password);
      console.log('THEY MATCH');
    } else {
      console.log('user does not exist')
    }

    return user;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10)
  }

  async signUp(name, email, username, password) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.addUser(name, email, username, hashedPassword);
    console.log('USER', user)
  }
}