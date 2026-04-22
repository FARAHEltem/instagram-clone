import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.following)
  follower!: User;

  @ManyToOne(() => User, user => user.followers)
  following!: User;

  @CreateDateColumn()
  createdAt!: Date;
}