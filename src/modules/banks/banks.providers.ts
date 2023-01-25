import { BANK_REPOSITORY } from 'src/core/constants';
import { Bank } from './bank.entity';

export const banksProviders = [
  {
    provide: BANK_REPOSITORY,
    useValue: Bank,
  },
];
