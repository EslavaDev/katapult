import { Sequelize } from 'sequelize-typescript';
import { Account } from '../../modules/accounts/accounts.entity';
import { Bank } from '../../modules/banks/bank.entity';
import { Supplier } from '../../modules/supplier/supplier.entity';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Bank, Account, Supplier]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
