import { DataTypes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'bridges',
})

export class Bridge extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    id: number;
  
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    roomId: number; 
}