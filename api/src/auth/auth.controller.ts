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

export class AccountDetailDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  value: string;
}

export class Email {
  @IsEmail(undefined, { message: 'Please enter a valid email!'})
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/log-in')
  async logIn(@Body() logInDto: LogInDto) {
    const userCheck = await this.authService.logIn(logInDto);
    return userCheck;
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
    return this.authService.changeAccountDetail(accountDetailDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfileData(@Request() req) {
    console.log('req', req.user);
    return this.authService.getProfileData(req.user.sub);
  }

  @Post('reset-password')
  sendResetPasswordEmail(@Body() email: Email) {
    return this.authService.sendResetPasswordEmail(email);
  }
}
