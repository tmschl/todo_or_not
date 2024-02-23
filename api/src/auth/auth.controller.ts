import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';


type LogInDto = {
  username: string;
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}
  
  
  @UseGuards(AuthGuard)

  @Get('/user')
  getUserData(@Request() req) {
    console.log('REQ USER', req.user);
    return req.user;
  }
  
  @Post('/log-in')
  async logIn(@Body() logInDto: LogInDto) {
      const userCheck = await this.authService.logIn(logInDto.username, logInDto.password);
      console.log(userCheck);
      return userCheck;
    }
    
    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
      console.log(signUpDto);
      return await this.authService.signUp(signUpDto);
    }
}
