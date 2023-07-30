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
  tableName: 'rooms',
})

export class Room extends Model {
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
    name: string; 

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  autorEmail: string;
}
