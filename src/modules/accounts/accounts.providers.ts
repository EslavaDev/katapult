import { ACCOUNTS_REPOSITORY } from '../../core/constants';
import { Account } from './accounts.entity';

export const accountsProviders = [
  {
    provide: ACCOUNTS_REPOSITORY,
    useValue: Account,
  },
];
