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
  tableName: 'users',
})

export class User extends Model {
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

  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    email: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
    picture: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    password: string;
}
