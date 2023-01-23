import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Account } from '../accounts/accounts.entity';

@Table
export class Supplier extends Model<Supplier> {
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  nit: string;

  @Column({
    type: DataType.STRING,
  })
  contactName: string;

  @Column({
    type: DataType.STRING(10),
  })
  contactPhone: string;

  @HasMany(() => Account)
  accounts: Account[];
}
