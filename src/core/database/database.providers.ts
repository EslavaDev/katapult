import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/modules/accounts/accounts.entity';
import { Bank } from 'src/modules/banks/bank.entity';
import { Supplier } from 'src/modules/supplier/supplier.entity';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Bank, Account, Supplier, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
