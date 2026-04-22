import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;
}