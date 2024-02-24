import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async logIn(username, password) {
    const user = await this.usersService.findUserByUsername(username);
    if (user !== null) {
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        throw new UnauthorizedException();
      } 

      const payload = { sub: user.id, username: user.username }; 
      return {
        access_token: await this.jwtService.signAsync(payload)
      }

    } else {
      console.log('user does not exist')
    }

  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
  }

  async signUp(signUpDto) {
    // check if username already exists
    // check if email already exists


    const hashedPassword = await this.hashPassword(signUpDto.password);
    console.log(hashedPassword);
    signUpDto.password = hashedPassword
    const user = await this.usersService.addUser(signUpDto);

    return 'fake token';
  }
}