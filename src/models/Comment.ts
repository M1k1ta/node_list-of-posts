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
  tableName: 'comments',
})

export class Comment extends Model {
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
    email: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    message: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    postId: number;
}
