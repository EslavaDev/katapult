import { ACCOUNTS_REPOSITORY } from 'src/core/constants';
import { Account } from './accounts.entity';

export const accountsProviders = [
  {
    provide: ACCOUNTS_REPOSITORY,
    useValue: Account,
  },
];
