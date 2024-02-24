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
    // check that user exists
    const user = await this.usersService.findUserByUsername(logInDto.username);

    // if user doesn't exist, throw unauthorized error
    if (!user) {
      throw new UnauthorizedException('username does not exist')
    }

    // verify that passwords match
    const passwordsMatch = await this.verifyPassword(logInDto.password, user.password);

    // if the passwords don't match, throw unauthorized error
    if (!passwordsMatch) {
      throw new UnauthorizedException('incorrect password');
    }

    const token = this.createAccessToken(user)

    return token;
  }

  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword);
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
    const usernameExists = (await this.usersService.findUserByUsername(signUpDto.username))?.username;
    const emailExists = (await this.usersService.findUserByEmail(signUpDto.email))?.email;

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