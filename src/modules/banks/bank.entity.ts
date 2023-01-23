import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Bank extends Model<Bank> {
  @Column({
    type: DataType.STRING(52),
    allowNull: false,
  })
  name: string;
}
