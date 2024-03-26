import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { FeaturesModule } from 'src/features/features.module';
import { UserStoriesModule } from 'src/userStories/userStories.module';
import { TasksServiceModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    FeaturesModule,
    UserStoriesModule,
    TasksServiceModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports: [AuthService, MailService],
})
export class AuthModule {}