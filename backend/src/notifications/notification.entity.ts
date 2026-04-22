import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string; // like, comment, follow

  @Column()
  message!: string;

  @ManyToOne(() => User)
  user!: User; // recipient

  @Column({ nullable: true })
  relatedId?: number; // post id, etc.

  @Column({ default: false })
  read!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
