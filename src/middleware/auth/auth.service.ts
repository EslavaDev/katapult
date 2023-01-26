import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../../modules/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const { dataValues: user } = await this.userService.findById(email);

    if (!user) {
      return null;
    }
    const match = await this.comparePassword(password, user.password);
    if (!match) {
      return null;
    }

    const { password: passwordUser, ...rest } = user;
    return rest;
  }

  private async comparePassword(password, dbPassword) {
    const match = await bcrypt.compare(password, dbPassword);
    return match;
  }

  async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...rest } = newUser['dataValues'];

    const token = await this.generateToken(rest);

    return { user: rest, token };
  }

  async login(user: UserDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
