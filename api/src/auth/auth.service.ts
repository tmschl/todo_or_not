import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountDetailDto, Email } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private mailService: MailService,
    private jwtService: JwtService,
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
    
    async createAccessToken(user: User, secret?: string) {
      const payload = { sub: user.id }; 

      if (secret) {
        return await this.jwtService.signAsync(payload, {
          secret,
          expiresIn: '10m',
        })
      } else {
        return await this.jwtService.signAsync(payload)
      }

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
      return this.createAccessToken(user);
    }
    
    async getProfileData(id: number) {
      const user = await this.usersService.findUserById(id);
      return {
        email: user.email,
        name: user.name,
        username: user.username,
      }
    }
    
    async changeAccountDetail(accountDetailDto: AccountDetailDto) {
      const user = await this.usersService.findUserByUsername(
        accountDetailDto.username
        );
        
        if (accountDetailDto.field === 'password') {
          console.log('made it to password', accountDetailDto.value)
          const plainTestPassword = accountDetailDto.value;
          const hashedPassword =  await this.hashPassword(plainTestPassword);
          user[accountDetailDto.field] = hashedPassword;
        } else {
          user[accountDetailDto.field] = accountDetailDto.value;
        }
        
        const updatedUser = await this.usersService.createUser(user);
        
        return {
          name: updatedUser.name,
          email: updatedUser.email,
          username: updatedUser.username,
        }
      }
      async sendResetPasswordEmail(body: Email) {
        const user = await this.usersService.findUserByEmail(body.email);

        if (user === null) {
          throw new BadRequestException("email not found");
        }

        const token = await this.createAccessToken(user, user.password);
        // send am email to the user with a link to a reset password page on the frontend with the JWT and userId as params
        return await this.mailService.sendPasswordResetEmail(user, token);
      }
    }
    