import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwt from 'src/config/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwt]
    }),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get('jwt').secret,
        signOptions: {
          expiresIn: '30s',
        },
      };
    },
    inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}