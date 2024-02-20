import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/name')
  async addName(@Body('name') name: string) {
    this.appService.addName(name);
    return name;
  }

  @Get()
  async getNames() {
    return this.appService.getNames();
  }
}
