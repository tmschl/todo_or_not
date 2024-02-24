import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async logIn(logInDto) {
    console.log(logInDto);
    // const user = await this.usersService.findUserByUsername(username);
    // if (user !== null) {
    //   const passwordsMatch = await bcrypt.compare(password, password);
    //   if (!passwordsMatch) {
    //     throw new UnauthorizedException();
    //   } 
    // } else {
    //   console.log('user does not exist')
    // }
    return 'fake token';
  }

  async createAccessToken(user) {
    const payload = { sub: user.id, username: user.username }; 
    return await this.jwtService.signAsync(payload)
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
  }

  async signUp(signUpDto) {
    const usernameExists = (await this.usersService.findUserByUsername(signUpDto.username)).length > 0;
    const emailExists = (await this.usersService.findUserByEmail(signUpDto.email)).length > 0;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword

    const user = await this.usersService.createUser(signUpDto);
    console.log(user);
    return this.createAccessToken(user);
  }
}