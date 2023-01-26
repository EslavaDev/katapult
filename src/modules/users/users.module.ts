import { Module } from '@nestjs/common';
import { providersUsers } from './users.providers';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...providersUsers],
  exports: [UsersService],
})
export class UsersModule {}
