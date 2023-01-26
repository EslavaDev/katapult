import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.TEXT,
    primaryKey: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
  })
  password: string;
}
