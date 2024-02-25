import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';



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
  @Transform((params) => sanitizeHtml(params.value))
  password: string;
}

export class LogInDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}
  
  
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfileData(@Request() req) {
    return this.authService.getProfileData(req.user.username);
  }
  
  @Post('/log-in')
  async logIn(@Body() logInDto: LogInDto) {
      const userCheck = await this.authService.logIn(logInDto);
      return userCheck;
    }
    
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }


}
