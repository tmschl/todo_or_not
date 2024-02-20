import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/name')
  async addName(
    @Body('firstName') firstName: string, 
    @Body('lastName') lastName: string
    ) {
    const fullName = this.appService.addName(firstName, lastName);
    return fullName;
  }

  @Get()
  async getNames() {
    return this.appService.getNames();
  }
}
