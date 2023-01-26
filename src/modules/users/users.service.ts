import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository_user: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.repository_user.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository_user.findAll({});
  }

  async findById(id: string): Promise<User> {
    return await this.repository_user.findOne({
      where: { email: id },
    });
  }

  async update(id: string, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.repository_user.update(
        { ...data },
        { where: { email: id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
