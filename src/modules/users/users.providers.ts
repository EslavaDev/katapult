import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.entity';

export const providersUsers = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
