import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
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

export class NewPasswordDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newPassword: string; 

  @IsNotEmpty()
  id: number; 

  @IsNotEmpty()
  token: string; 
}

export class Email {
  @IsEmail(undefined, { message: 'Please enter a valid email!'})
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}

export class ProjectDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;
}


export class FeatureDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsNotEmpty()
  projectId: number;
}

export class UserStoryDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  featureId: number;

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

  @Post('save-new-password')
  saveNewPassword(@Body() body: NewPasswordDto) {
    return this.authService.saveNewPassword(body.newPassword, body.id, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('delete-user')
  deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/user-projects')
  getUserProjects(@Request() req) {
    return this.authService.getUserProjects(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/project/:id')
  getProject(@Param('id') id: number, @Request() req) {
    return this.authService.getProject(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    console.log('project info' , projectDto)
    console.log('req', req.user.sub)
    return this.authService.createProject(projectDto.name, projectDto.description, req.user.sub);
  }


  @UseGuards(AuthGuard)
  @Post('create-feature')
  createFeature(@Body() featureDto: FeatureDto, @Request() req) {
    return this.authService.createFeature(
      featureDto.name, 
      featureDto.description, 
      req.user.sub,
      featureDto.projectId, 
    );
  }

  @UseGuards(AuthGuard)
  @Post('create-user-story')
  createUserStory(@Body() userStoryDto: UserStoryDto, @Request() req) {
    console.log('user story dto', userStoryDto, req.user.sub);
    return this.authService.createUserStory(
      userStoryDto.name, 
      userStoryDto.description, 
      req.user.sub,
      userStoryDto.projectId, 
      userStoryDto.featureId,
    );

  }
}
