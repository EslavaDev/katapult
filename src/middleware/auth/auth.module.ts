import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule, AuthGuard } from '@nestjs/passport';
import { UsersModule } from '../../modules/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.stategy';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwtGuard.strategy';
import { Errors } from './errors';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, Errors],
  controllers: [AuthController],
})
export class AuthModule {}
