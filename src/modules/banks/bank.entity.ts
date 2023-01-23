import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Account } from '../accounts/accounts.entity';

@Table
export class Bank extends Model<Bank> {
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  name: string;

  @HasMany(() => Account)
  accounts: Account[];
}
