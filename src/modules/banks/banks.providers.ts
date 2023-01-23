import { BANK_REPOSITORY } from '../../core/constants';
import { Bank } from './bank.entity';

export const banksProviders = [
  {
    provide: BANK_REPOSITORY,
    useValue: Bank,
  },
];
