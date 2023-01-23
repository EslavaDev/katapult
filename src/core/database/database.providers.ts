import { Sequelize } from 'sequelize-typescript';
import { Bank } from 'src/modules/banks/bank.entity';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Bank]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
