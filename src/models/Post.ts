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
  tableName: 'posts',
})

export class Post extends Model {
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
    title: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    body: string;
}
