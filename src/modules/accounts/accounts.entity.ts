import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Bank } from '../banks/bank.entity';
import { Supplier } from '../supplier/supplier.entity';

@Table
export class Account extends Model<Account> {
  @Column({
    type: DataType.STRING(15),
    primaryKey: true,
  })
  accountNumber: string;

  @ForeignKey(() => Bank)
  @Column
  bankName: string;

  @BelongsTo(() => Bank, { onDelete: 'CASCADE' })
  bank: Bank;

  @ForeignKey(() => Supplier)
  @Column
  supplierAccount: number;

  @BelongsTo(() => Supplier, { onDelete: 'CASCADE' })
  supplier;
}
