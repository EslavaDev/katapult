import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { databaseConfigTest } from 'src/core/database/database.config';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDB = new Sequelize(databaseConfigTest);
  memDB.addModels(models);
  await memDB.sync();
  return memDB;
}
