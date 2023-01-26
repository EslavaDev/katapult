import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../../modules/users/dto/user.dto';
import { Errors } from './errors';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private errors: Errors) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() user: UserDto, @Res() res: Response) {
    try {
      res.status(200).json(await this.authService.create(user));
    } catch (error) {
      this.errors = new Errors(error);
      const { code, message } = this.errors.messageError();
      res.status(code).json({ message });
    }
  }
}
