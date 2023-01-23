import { ACCOUNTS_PROVIDER } from 'src/core/constants';
import { Account } from './accounts.entity';

export const accountsProviders = [
  {
    provide: ACCOUNTS_PROVIDER,
    useValue: Account,
  },
];
